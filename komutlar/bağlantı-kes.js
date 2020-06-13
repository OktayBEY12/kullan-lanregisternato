const Discord = require("discord.js")
exports.run = async function(client, message, args) {
const user = message.mentions.members.first()
if (!user) return message.reply("**Bir kullanıcı etiketlemelisin.**")

if (!user.voiceChannel || user.voiceChannel.id === null || user.voiceChannel.id === NaN || user.voiceChannel.id === undefined) return message.reply(`**Etiketlediğin kullanıcı zaten, herhangi bir ses kanalında bulunmuyor.**`)

user.setVoiceChannel(null).then(() => {
message.channel.send(`**${message.author} başarıyla ${user} kullanıcısının bağlantısı kesildi.**`)
})
}
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["bağlantı-kes"],
permLevel: 0
}
exports.help = {
name: 'bağlantı-kes',
description: 'Kullanıcının bağlantısını keser.',
usage: 'bağlantı-kes @Üye #Kanal'
}
//TlhaMert Youtube Kanalına Abone Ol ! 
