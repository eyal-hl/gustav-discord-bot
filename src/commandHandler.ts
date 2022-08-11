import { Message } from "discord.js";
import { GreetCommand, TimeCommand, CopyCommand } from "./commands";
import Command from "./commands/commandInterface";
import { CommandParser } from "./models/commandParser";

export default class CommandHandler {

  private commands: Command[];

  private readonly prefix: string;

  constructor(prefix: string) {

    const commandClasses = [
      GreetCommand,
      TimeCommand,
      CopyCommand
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.prefix = prefix;
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) {
      return;
    }

    const commandParser = new CommandParser(message, this.prefix);
    
    if (commandParser.parsedCommandName.toLowerCase() == "help") {
      await this.handleHelp(commandParser);
    }else{
      await this.handleCommand(commandParser);
    }

    
  }
  
  private async handleHelp(commandParser: CommandParser): Promise<void>{
    if (commandParser.args.length == 0){
      await commandParser.originalMessage.channel.send(this.helpMessage());
    } else if (commandParser.args.length == 1){
      const matchedCommand = this.commands.find(command => command.commandNames.includes(commandParser.args[0]));
      if (!matchedCommand){
        await commandParser.originalMessage.reply(`I don't recognize that command. Try ${this.prefix}help.`);
      }
      else{
        await commandParser.originalMessage.channel.send(matchedCommand.help());
      }
    } else {
      await commandParser.originalMessage.channel.send(`Use ${this.prefix}help for description of all commands
      use ${this.prefix}help command for detailed help message about the command`)
    }
  }

  private async handleCommand(commandParser: CommandParser): Promise<void>{
    const matchedCommand = this.commands.find(command => command.commandNames.includes(commandParser.parsedCommandName));
    if (!matchedCommand) {
      await commandParser.originalMessage.reply(`I don't recognize that command. Try !help.`);
    } else {
      await matchedCommand.run(commandParser).catch(error => {
        commandParser.originalMessage.reply(`'${this.echoMessage(commandParser.originalMessage)}' failed because of ${error}`);
      });
    }
  }

  /** Sends back the message content after removing the prefix. */
  echoMessage(message: Message): string {
    return message.content.replace(this.prefix, "").trim();
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }

  private helpMessage(): string{
    return this.commands.map(command => command.help()).join('\n');
  }
  
  
}
