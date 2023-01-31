import Discord from "discord.js"
import {client} from "../../../index";

const glitterLinks = [
    "https://tenor.com/view/glitter-gif-24035134",
    "https://tenor.com/view/stylecraft-rbe2019-glitter-glitter-angel-confetti-gif-13778272",
    "https://cdn.discordapp.com/attachments/1055103714769244250/1069059091529478204/MscitBv.gif",
    "https://cdn.discordapp.com/attachments/1055103714769244250/1069059356458496020/4NvoVzv.gif",
    "https://cdn.discordapp.com/attachments/1055103714769244250/1069059675615658024/6nbNg9W.gif",
    "https://tenor.com/view/glitter-britney-spears-shiny-free-glitter-britney-gif-21680807",
    "https://tenor.com/view/glitter-glitterthrow-whatever-fab-gif-5217758",
    "https://tenor.com/view/glitterbae-glitter-sparkle-confetti-gif-13831787",
    "https://tenor.com/view/glitter-hands-silver-gif-12735730",
    "https://tenor.com/view/taylor-swift-glitter-gif-14099916",
    "https://tenor.com/view/glitter-everywhere-gif-13912718",
    "https://tenor.com/view/sparkle-glitter-gif-18926758",
    "https://tenor.com/view/glitter-sparkle-makeup-slayage-yas-gif-13470739",
    "https://tenor.com/view/ru-pauls-drag-race-glitter-confetti-celebrate-happy-gif-13068937",
    "https://tenor.com/view/flying-glitter-glitter-gif-12812218"
]

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("glitter")
        .setDescription("Send glitter to Stefan")
        .addStringOption(option =>
            option.setName("custom_message")
                .setDescription("Add a custom message for Stefan")),

    async execute(interaction: Discord.ChatInputCommandInteraction) {
        const customMessage = interaction.options.getString("custom_message")

        const randomIndex = Math.floor(Math.random() * glitterLinks.length)
        const link = glitterLinks[randomIndex]

        const stefan = await client.users.fetch("677942189644578826")

        if (customMessage)
            await stefan.send(customMessage)
        else
            await stefan.send(`${interaction.member} has sent you a lovely gift of glitter`)
        await stefan.send(link)

        await interaction.reply({content: "Sent glitter successfully", ephemeral: true})
    }
}
