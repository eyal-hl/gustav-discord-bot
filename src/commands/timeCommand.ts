import Command from "./commandInterface";
import config from "../config/botConfig"
import { Message } from "discord.js";
import { CommandParser } from "../models/commandParser";

export class TimeCommand implements Command {
  commandNames = ["time"];

  async help(message: Message): Promise<void> {
    message.reply(`Use ${config.prefix}time to current time.`);
  }

  async run(command: CommandParser): Promise<void> {
    const now = new Date();
    await command.originalMessage.reply(`${now.getHours()} : ${now.getMinutes()}`);
  }
  description(): string {
      return "something"
  }
}


