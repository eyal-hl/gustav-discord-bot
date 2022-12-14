/** Intermediate module file for exporting all commands
 * Makes importing several commands simpler
 * 
 * before: 
 * import { EchoCommand } from "./commands/echoCommand";
 * import { NextCommand } from "./commands/nextCommand";
 * 
 * now:
 * import { EchoCommand, NextCommand } from "./commands";
 * 
 * DO NOT export command classes using default
 */

export * from "./greetCommand";
export * from "./timeCommand";

export * from "./leagueCommands/chestCommands"

export * from "./miscCommands/googleCommands"
export * from "./miscCommands/randomCommands"