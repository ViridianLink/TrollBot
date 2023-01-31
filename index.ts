import Discord from "discord.js";
import dotenv from "dotenv";
import {TrollBot} from "./client"
import deployCommands from "./deploy_commands";
import {loadSlashCommands} from "./commands/load_commands";

if (process.env.NODE_ENV == "development") {
    dotenv.config({path: "./.env.local"})
} else {
    dotenv.config()
}

export const client = new TrollBot({
    intents: [
        Discord.GatewayIntentBits.DirectMessages
    ]
})

client.on("ready", async () => {
    console.log(`${client.constructor.name} is Running, version: ${client.version.join('.')}`);

    client.user?.setPresence({activities: client.activities, status: "online"})

    loadSlashCommands(client)

    if (process.env.NODE_ENV == "development") {
        await deployCommands(client)
    }
});

client.on(Discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as TrollBot
    const command = client.slashCommands?.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        })
    }
})

client.login(process.env.TOKEN).then();
