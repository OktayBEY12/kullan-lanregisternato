const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let tlhamertyoutube = message.mentions.roles.first()
  

  if (!tlhamertyoutube) {
    return message.channel.send(` Bir Rol Belirtmen Lazım.`)
    }
    
  
  
  db.set(`partizanekoop_${message.guild.id}`, tlhamertyoutube.name)
  
    message.channel.send(`Disco Rolü \`${tlhamertyoutube.name}\` Olarak Ayarladım.`)
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['disco-rol'],
  kategori: 'ayarlar',
    permLevel: 0
}

exports.help = {
    name: 'disco-rol-ayarla',
    description: 'Disco Rolünü Ayarlar.',
    usage: 'disco-rol-ayarla <@rol>'
}
//TlhaMert Youtube Kanalına Abone Ol ! 