const { PermissionsBitField, ChannelType, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = async (interaction, client) => {
    const CategoryID = interaction.channel.parentId;
    if (!CategoryID) return await interaction.reply({ content: "Ticketが停止しています。", ephemeral: true });
    const Category = interaction.guild.channels.cache.get(CategoryID);
    if (Category.children.cache.find((channel) => channel.topic === interaction.user.id)) return interaction.reply({
        content: "ticketの上限に達しています(1/1)",
        ephemeral: true
    });
    const c = await interaction.guild.channels.create({
        name: `🎫｜${interaction.user.username}`,
        type: ChannelType.GuildText,
        parent: CategoryID,
        topic: interaction.user.id,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel]
            }
        ]
    });
    const embed = new EmbedBuilder()
        .setColor(Colors.Aqua)
        .setTitle("チケット作成完了")
        .setDescription("ご用件を送信してスタッフの対応をお待ちください。")
        .setFooter({
            text: `ticket bot by ${devname}`,
            iconURL: devicon
        })
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("ticketclose").setLabel("チケットを閉じる").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("ticketcall").setLabel("スタッフを呼び出す").setStyle(ButtonStyle.Success)
        )
    await c.send({ embeds: [embed], components: [button] })
    await c.send(interaction.user.toString())
    await interaction.reply({ content: `チケットを作成しました。${c.toString()}`, ephemeral: true })
}