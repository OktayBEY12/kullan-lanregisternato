const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


const { RichEmbed } = require('discord.js')
class Run{
  constructor(client) {
    this.client = client;
  }

  async run(reaction, user) {
    try{
    if(!reaction.message) return;
    const message = reaction.message;
    if (reaction.emoji.name !== '⭐') return;
    if (message.author.id === user.id) return message.channel.send(`${user} Kendi Mesajına Star Vermezsin`);
    if (message.author.bot) return
    const starboardChannel = db.fetch(`sunucular.${message.guild.id}.starboard.kanal`);
    const starChannel = client.guilds.get(message.guild.id).channels.find(cid => cid.id == starboardChannel);
    if (!starChannel) return;
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
    const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
      const embed = new RichEmbed()
        .setColor(foundStar.color)
	      .setTitle('Tıkla Ve Uç!')
	      .setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
	      .setURL('https://discord.js.org/')
        .setDescription(foundStar.description)
        .addField(`Mesaj Içeriği`, message.cleanContent,true)
        .addField(`Kanal`, `<#${reaction.message.channel.id}>`,true)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter(`⭐ ${reaction.count} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      console.log(reaction.count)
      if(reaction.count == 0) {
        starMsg().delete(1000)
      }else await starMsg.edit({ embed });
    }
    if (!stars) {
      const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
      if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
      const embed = new RichEmbed()
        .setColor(15844367)
	      .setTitle('Tıkla Ve Uç!')
	      .setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
        .addField(`Mesaj Içeriği`, message.cleanContent,true)
        .addField(`Kanal`, `<#${reaction.message.channel.id}>`,true)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp(new Date())
        .setFooter(`⭐ ${reaction.count} | ${message.id}`)
        .setImage(image);
      await starChannel.send({ embed });
    }
        }catch(e) {return}
  }
    
  extension(reaction, attachment) {
    const imageLink = attachment.split('.');
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return '';
    return attachment;
  }
    
};
const run = new Run() 
client.on('messageReactionAdd', (reaction,user) => {
  run.run(reaction,user)
})
client.on('messageReactionRemove', (reaction,user) => {
  run.run(reaction,user)
})
client.on('messageReactionRemoveAll', (reaction,user) => {
  run.run(reaction,user)
})

// --------------------------------------------------------------------------------Düzenlenicek Kısım Başlangıcı -------------------------------------------------------------------------------------------------------------------------------------------

client.on('guildMemberAdd',async member => {
  let gkisi = client.users.get(member.id);
  
    const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
    if (ktarih < 2592000001) 
  member.addRole("FAKE ROL İD")//fake üyeye verilecek rol
  member.removeRole("KULLANICI ROL ID")//fake üyeden alınacak rol
});



client.on("guildMemberAdd", member => {
  const kanal = "KAYIT KANALI ID"; //kişi geldiği zaman mesaj atılacak kanal id
  moment.locale("tr");// Saat icin gerekli
  let samet = client.channels.get(kanal);
  samet.send(
    " " +
      member +
      "** Hoş Geldin! **\n\n **Seninle Birlikte " +
      member.guild.memberCount +
      " Kişiyiz!** \n\n< **Kayıt işleminin başlaması için,<@&KAYIT YETKİLİSİ ID> yetkililerini etiketleyip ses teyit odalarına geçebilirsin.**  \n\n **Hesabın Oluşturulma Tarihi :** " +
      moment(member.user.createdAt).format("DD MMMM YYYY, dddd  hh:mm:ss ") +
      " \n\n **Kayıt işlemin tamamlanırken ölüm ile yaşam arasında ki çizgiyi takip et! **",
    new Discord.Attachment(
      "https://cdn.discordapp.com/attachments/583680695293968404/601813274090274836/giphy.gif"
    )
  );
});
client.on("userUpdate", async(eski, yeni) => {
  if(eski.username !== yeni.username) {
  if(!yeni.username.includes("&ƝƛƬƠ") && client.guilds.get("720726951089799258").members.get(yeni.id).roles.has("720728596712259624")) {
     client.guilds.get("720726951089799258").members.get(yeni.id).removeRole("720728596712259624")
     client.channels.get('720913317585092679').send(`:broken_heart: ${yeni}, &ƝƛƬƠ tagını çıkardı!`)
    }
     if(yeni.username.includes("&ƝƛƬƠ") && !client.guilds.get("720726951089799258").members.get(yeni.id).roles.has("720728596712259624")) {
      client.channels.get('720913317585092679').send(`:heart: ${yeni}, &ƝƛƬƠ tagını aldı!`)
      client.guilds.get("720726951089799258").members.get(yeni.id).addRole("720728596712259624")
     }
  }
  })