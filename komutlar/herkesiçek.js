const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = async (client ,message ,args) => {
const id = args[0]
if (!id)
return message.reply("720728648059060325")
message.guild.members.filter(a => a.voiceChannel).forEach(x => x.setVoiceChannel(id))
message.channel.send(`Bütün Sesli Kanaldaki Üyeler <#${id}> İsimli Odaya Taşındı! `)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['herkesi-taşı'],
  permLevel: 0
};
exports.help = {
  name: "çek"
};
//TlhaMert Youtube Kanalına Abone Ol ! 