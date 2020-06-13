const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin`, message.author.avatarURL)
  
    if (!message.member.roles.find("name", "🔱・Alpha Veya Üstü")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** 🔱・Alpha Veya Üstü **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    } 
  
  var sebep = args.slice(1).join(" ") || "Belirtilmemiş"
  
  const kisiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Kişiyi Etiketlemelisin`, message.author.avatarURL)
  
  var kisi = message.mentions.users.first()
  
  if (!kisi)
    return message.channel.send(kisiyok)
  
  let uyarı = await db.add(`uyarı.${kisi.id+message.guild.id}`, 1)
  
  const tamamdir = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Kullanıcı Başarıyla Uyarıldı`, message.author.avatarURL)
  
  message.channel.send(tamamdir)
  
  let modlogkanal = message.guild.channels.find(channel => channel.name === "📜・log")
  
  if (!modlogkanal) return;
  
  const sbb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Kullanıcı Sunucuda Uyarıldı!")
  .addField(`Uyarılan Kişi`, `${kisi}`)
  .addField(`Uyaran Kişi`, `${message.author}`)
  .addField(`Sebep`, `${sebep}`)
  .setTimestamp()

  message.guild.channels.get(modlogkanal.id).send(sbb)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyar", "warn", "uyarı"],
  perm: 0
}

exports.help = {
  name: "Uyar",
  description: "Kişiyi Uyarır",
  usage: ".uyar @Kişi Sebep"
}