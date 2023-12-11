const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping confirm"),

    async function (interaction, client) {
        await interaction.reply(`${client.ws.ping} log`)
    }
}