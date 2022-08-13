import Command from "../commandInterface";
import config  from "../../config/botConfig"; "../../config/botConfig"
import { CommandParser } from "../../models/commandParser";


export class rosinerCommand implements Command {
  commandNames = ["rosiner", "yuval_rosiner"];

  help(): string {
    return (`Use ${config.prefix}rosiner to check if rosiner is diamond`);
  }

  async run(command: CommandParser): Promise<void> {
    command.originalMessage.channel.send("Rosiner not diamond lol");
    console.log(command.originalMessage.author.username);
    
    if (command.originalMessage.author.username == "Mr.Raisin" || command.originalMessage.author.username == "Mr. Raisin"){
        command.originalMessage.reply("You still suck lol");
    }
  }

  description(): string {
      return "Checks if rosiner is diamond"
  }
}
