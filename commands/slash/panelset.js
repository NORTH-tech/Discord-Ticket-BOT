const { SlashCommandBuilder, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panelset")
        .setDescription("問い合わせパネルを設置!!")
        .addAttachmentOption(option =>
            option
                .setName("image")
                .setDescription("image")
                .setRequired(false)
        ),

    async function(interaction, client) {
        const CategoryID = interaction.channel.parentId;
        if (!CategoryID) return await interaction.reply({ content: "カテゴリ内のチャンネルで実行してください。", ephemeral: true });
        const modal = new ModalBuilder()
            .setCustomId('panelset')
            .setTitle('チケットパネルセット');
        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel("タイトルを入力してください。")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(10)
            .setPlaceholder("10文字以内")
            .setRequired(true)
        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("説明文を入力してください。")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder("100文字以内")
            .setRequired(false)
        const label = new TextInputBuilder()
            .setCustomId('label')
            .setLabel("ボタンラベルを入力してください。")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(10)
            .setPlaceholder("7文字以内")
            .setRequired(true)
        const image = new TextInputBuilder()
            .setCustomId('image')
            .setLabel("アップロードした画像URL ※こちらは変更しないでください。")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(300)
            .setRequired(true)
            .setValue("https")
        modal.addComponents(new ActionRowBuilder().addComponents(title));
        modal.addComponents(new ActionRowBuilder().addComponents(description));
        modal.addComponents(new ActionRowBuilder().addComponents(label));
        const Attachment = interaction.options.getAttachment('image');
        if (Attachment) {
            image.setValue(Attachment.attachment)
            modal.addComponents(new ActionRowBuilder().addComponents(image));
        }
        await interaction.showModal(modal);
    }
}