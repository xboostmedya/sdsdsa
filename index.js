const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, IntegrationApplication } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const wixua = require("croxydb")
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
const { channel } = require("diagnostics_channel");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[BOT] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)


client.on('interactionCreate', async (interaction) => {
  if(interaction.customId === "reklamver") {

    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;

    const reklam1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`demir`)
        .setLabel('Sipariş Sorunları')
        .setEmoji("🛒")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`altın`)
        .setLabel('Ödeme Sorunları')
        .setEmoji("💳")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`elmas`)
        .setLabel('Diğer')
        .setEmoji("❓")
        .setStyle(ButtonStyle.Secondary)
    );

const embed = new EmbedBuilder()
.setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
.setDescription(`> Selam **${interaction.user.tag}**, Aşağıdaki seçeneklerden sana uygun olan kategoriyi seçip talebini oluşturabilirsin.`)
.setColor("Blue")
.setFooter({text: interaction.user.tag, iconURL: interaction.user.avatarURL()})

interaction.reply({embeds: [embed], ephemeral: true, components: [reklam1]})

}


if(interaction.customId === "demir") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `talep-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔴")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Çözümlendi')
      .setEmoji("🟢")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`islemsuruyor`)
      .setLabel('İşlemler Sürüyor')
      .setEmoji("🟡")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, ilk aktif ve müsait yetkilimiz sohbete katılıp sizlerle ilgilenecektir, talebinizin hızlı çözümlenmesi iin lütfen sabırla bekleyiniz.\n\n> Kategori: **Sipariş Sorunları**`)
  .setFooter({text: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Talep Kanalın başarıyla **açıldı** yetkililer kısa süre içinde seninle ilgilenecek.`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })

}

if(interaction.customId === "odeme") {

  const embed = new EmbedBuilder()
  .setTitle("İşlem Başarısız")
  .setDescription("> **Çözümlendi** butonunu kullanmak için gerekli yetkiniz yoktur.")
  .setFooter({text: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setColor("Red")

  interaction.reply({embeds: [embed], ephemeral: true})

}



if(interaction.customId === "altın") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔴")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Çözümlendi')
      .setEmoji("🟢")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`islemsuruyor`)
      .setLabel('İşlemler Sürüyor')
      .setEmoji("🟡")
      .setStyle(ButtonStyle.Secondary)
  )
  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, ilk aktif ve müsait yetkilimiz sohbete katılıp sizlerle ilgilenecektir, talebinizin hızlı çözümlenmesi iin lütfen sabırla bekleyiniz.\n\n> Kategori: **Ödeme Sorunları**`)
  .setFooter({text: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Talep Kanalın başarıyla **açıldı** yetkililer kısa süre içinde seninle ilgilenecek.`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })

}
if(interaction.customId === "islemsuruyor") {

  const embed = new EmbedBuilder()
  .setTitle("İşlem Başarısız")
  .setDescription("> **İşlemler Sürüyor** butonunu kullanmak için gerekli yetkiniz yoktur.")
  .setFooter({text: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setColor("Red")

  interaction.reply({embeds: [embed], ephemeral: true})

}

if(interaction.customId === "elmas") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(4)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Elmas**`)
  .setFooter({text: "Wixua Tester"})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id})

}
if(interaction.customId === "kapat") {

  interaction.channel.delete()
}
})