import Discord from "discord.js";
import {ISlashCommand} from "./commands/commands_slash/command";

export class TrollBot extends Discord.Client {
    version = [1, 0, 0]
    developers = ["211486447369322506"]
    activities: Discord.ActivityOptions[] = [
        {name: "/glitter", type: Discord.ActivityType.Playing, url: "https://www.patreon.com/collegekings"}
    ]
    slashCommands: Discord.Collection<string, ISlashCommand> = new Discord.Collection
}
