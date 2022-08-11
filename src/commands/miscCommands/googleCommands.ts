import Command from "../commandInterface";
import config  from "../../config/botConfig"; "../../config/botConfig"
import { CommandParser } from "../../models/commandParser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
import gis from "g-i-s"


export class picCommand implements Command {
  commandNames = ["pic", "image"];

  help(): string {
    return (`Use ${config.prefix}pic/image amount text to get the top amount images for this text`);
  }

  async run(command: CommandParser): Promise<void> {
    await gis(command.args.slice(1).join(' '), async (error:string,results:{url:string,width:number,height:number}[])=>{
        await command.originalMessage.channel.send("",{files:results.slice(0,Number(command.args[0])).map(result=>result.url)})
    });
  }

  description(): string {
      return "shows images from google"
  }
}
