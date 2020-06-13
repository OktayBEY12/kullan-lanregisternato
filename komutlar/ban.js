const Discord = require('discord.js');
const db = require('quick.db');
exports.run = (client, message, args) => {

     let user = message.mentions.users.first()  
 
  let hata3 = new Discord.RichEmbed()
 .setTitle('Bir Hata oluştu :(')
 .setDescription(message.member.user.username + ', \n :white_small_square:  \n **.ban <kullanıcı>** şeklinde olmalı!')
 .setColor('000000')


  let hata4 = new Discord.RichEmbed()
 .setTitle('Bir Hata oluştu :(')
 .setDescription(message.member.user.username + ', yetkilileri yasaklayamassın!')
 .setColor('000000')
.setFooter('Ne kadar tuhaf dimi?')




let hata2 = new Discord.RichEmbed()
 .setTitle('Bir Hata oluştu :(')
 .setDescription(message.member.user.username + ' Sunucudan Birini yasaklamak için,**"ÜYELERİ ENGELLE"** Yetkisine,sahip olman gerekiyor.')
 .setColor('000000')
 


///////////////////////////////////////////////////ing


if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(hata2) 
if (message.mentions.users.size < 1) return message.channel.sendEmbed(hata3)    
if (message.guild.member(user).hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(hata4)      
    

     
 
    message.channel.send('**' + user + '**,**' + message.member.user.username + '** Tarafından Yasaklandı!')
 message.guild.ban(user, 2);
    
  
 

 

    
   
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'ban atmak',
  usage: 'ban'
};
//TlhaMert Youtube Kanalına Abone Ol ! 