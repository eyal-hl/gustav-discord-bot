import Command from "../commandInterface";
import config  from "../../config/botConfig"; "../../config/botConfig"
import { Message } from "discord.js";
import { CommandParser } from "../../models/commandParser";

export class CopyCommand implements Command {
  commandNames = ["Copy", "copy"];

  async help(message: Message): Promise<void> {
    await message.reply(`Use ${config.prefix}copy for you message to be copied.`);
  }

  async run(command: CommandParser): Promise<void> {
    await command.originalMessage.channel.send(`Lmao you wrote ${command.args.join(' ')}`);
  }

  description(): string {
      return "copy that"
  }
}
