import Command from "../commandInterface";
import config  from "../../config/botConfig"; "../../config/botConfig"
import { CommandParser } from "../../models/commandParser";
import { aliases } from "../../config/miscConfigs";
import { urlsOfChampsWithChests } from "../../BL/chestFinder";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import combineImage from "combine-image";
import Jimp from "jimp";

export class ChestCommand implements Command {
  commandNames = ["chest", "chst"];

  help(): string {
    return (`Use ${config.prefix}chest (eune/euw) summoner name. to get list of all champs that you got a chest for
    You can use an alias instead of the region+summoner name`);
  }

  async run(command: CommandParser): Promise<void> {
    let region = "";
    let summonerName = "";
    if (command.args.length == 1){
      const alias = aliases[command.args[0].toLowerCase()]
      if (alias){
        region = alias.region;
        summonerName = alias.summonerName;
      }
      else {
        command.originalMessage.reply("No alias found")
        return;
      }
    }
    else{
      region = command.args[0];
      summonerName = command.args.slice(1).join(" ");
    }
    const urls = await urlsOfChampsWithChests(region,summonerName)

    const rowsURL:string[][] =[]
    const rowLength = Math.floor(Math.sqrt(urls.length));
    const splitPoint = Math.floor(urls.length/rowLength)*rowLength
    for (let i = 0; i < splitPoint; i += rowLength) {
        const row = urls.slice(i, i + rowLength);        
        rowsURL.push(row);
    }
    
    urls.slice(splitPoint).forEach((url,index)=>rowsURL[index].push(url))
    
    const rowsPromise:Promise<Jimp>[] = rowsURL.map(row=>{
      if (row.length>1){
        return combineImage(row);
      }
      else{
        return Jimp.read(row[0])
      }
    })
    


    const rowsResolved:Jimp[] = (await Promise.all(rowsPromise));
    let img:Jimp;
    if (rowsResolved.length>1){
      const buffers: Buffer[] =[]
      for (let i = 0; i<rowsURL.length;i++){
        rowsResolved[i].getBuffer(Jimp.MIME_PNG, (err,buffer)=>{
          buffers.push(buffer);
        })
      }
      await new Promise(r => setTimeout(r, 200));
      
      
      img = await combineImage(buffers,{direction:"row"})
    }
    else{
      img = rowsResolved[0]
    }    
    
    img.write('tmp.png')
    await new Promise(r => setTimeout(r, 200));
    command.originalMessage.channel.send("",{files:['tmp.png']});
  }

  description(): string {
      return "Chest information"
  }
}
