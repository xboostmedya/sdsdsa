const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb");
module.exports = {
  name: "ticket-kur",
  description: "Botun pingini gösterir!",
  type: 1,
  options: [],
  run: async (client, interaction) => {

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji(`🎫`)
            .setLabel(`Talep Oluştur`)
            .setStyle(2)
            .setCustomId("reklamver")
    )

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, false)) {
      return interaction.reply({ content: "❌ **|** Bu komutu kullanmak için **gerekli izinleri** karşılayamıyorsun.", ephemeral: true })
    }

    const server = interaction.guild

const embed = new EmbedBuilder()
.setAuthor({name: "Destek Sistemi", iconURL: server.iconURL({ dynmaic: true })})
.setDescription("**> Pazaryazılım destek merkezine hoşgeldiniz, aşağıda ki butona tıklayarak talebinizi oluşturabilirsiniz, talepleriniz en geç 2 saat içerisinde yanıtlanacaktır.**")
.setThumbnail('https://i.hizliresim.com/9azqu4c.png')
.setColor("Aqua")
.setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})

interaction.reply({content: "✅ | Ticket Paneli Gönderildi!", ephemeral: true})
interaction.channel.send({embeds: [embed], components: [row]})

}
}
