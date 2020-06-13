const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
  

  if (!msg.member.hasPermission ("ADMINISTRATOR")) return msg.reply(`Bu Komutu Kullanmak İçin **Yönetici** İznine Sahip Olmalısın!`);
  
  let devtrdiscoamk = await db.fetch(`devtrdisco_${msg.guild.id}`);
   setInterval(() => {
  msg.guild.roles.find('name', devtrdiscoamk).setColor("RANDOM");
   }, 1300);
msg.channel.send(`**Parti Başladı ama kızlar nerde**!`)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['disko'],
  kategori: 'ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'disco',
    description: 'Disco',
    usage: 'disco'
}
//TlhaMert Youtube Kanalına Abone Ol ! 