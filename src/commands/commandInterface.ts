import { Message } from "discord.js";
import { CommandParser } from "../models/commandParser";

export default interface Command {
  /**
   * List of aliases for the command.
   * The first name in the list is the primary command name.
   */
  readonly commandNames: string[];

  /** Usage documentation. */
  help(): string;

  /** Execute the command. */
  run(commandParsed: CommandParser): Promise<void>;

  /** Description of the command */
  description():string;
}
