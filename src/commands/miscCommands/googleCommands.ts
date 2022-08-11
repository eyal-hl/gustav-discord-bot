import Command from "../commandInterface";
import config  from "../../config/botConfig"; "../../config/botConfig"
import { CommandParser } from "../../models/commandParser";
import Scraper from "images-scraper"


const google = new Scraper({safe:false, tbs:{}, puppeteer:{}});


export class picCommand implements Command {
  commandNames = ["pic", "image"];

  help(): string {
    return (`Use ${config.prefix}pic/image amount text to get the top amount images for this text`);
  }

  async run(command: CommandParser): Promise<void> {
    const results = await google.scrape(command.args.slice(1).join(" "), Number(command.args[0]))
    
    
    await command.originalMessage.channel.send("",{files:results.map(result=>result.url)});
  }

  description(): string {
      return "shows images from google"
  }
}
