import Command from "./commandInterface";
import config from "./../config/botConfig";
import { Message } from "discord.js";
import { CommandParser } from "../models/commandParser";

export class GreetCommand implements Command {
  commandNames = ["greet", "hello"];

  async help(message: Message): Promise<void> {
    message.reply(`Use ${config.prefix}greet to get a greeting.`);
  }

  async run(command: CommandParser): Promise<void> {
    await command.originalMessage.reply("hello, User!");
  }

  description(): string {
      return "blank"
  }
}
