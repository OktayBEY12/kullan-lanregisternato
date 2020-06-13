   
const devtr = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "720728598339911831"); 
  const misafir = message.guild.roles.find(r => r.id === "720728599778557973"); 
  const log = message.guild.channels.find(c => c.id === "720728627209044060"); 
  const devtrtag = "";
  if(!message.member.roles.array().filter(r => r.id === "720728590953480255")[0]) { 
    return message.channel.send("Yetkili Değilsen Uza");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const devtrmember = message.guild.member(member)
    const devtrnick = args[1];
    const devtryas = args[2];
      if(!devtrnick) return message.channel.send("İsim Gir")
      if(!devtryas) return message.channel.send("Yaş Gir")
    devtrmember.addRole(kayıtlı)
    devtrmember.removeRole(misafir)
    devtrmember.setNickname(`${devtrtag} ${devtrnick} | ${devtryas}`)
    const embed = new devtr.RichEmbed()
    .setAuthor("Kayıt Yapıldı")
    .addField(`Kaydı Olan\n`, `${devtrmember.user.tag}`)
    .addField(`Kaydı Gerçekleştiren :\n`, `${message.author.tag}`)
    .addField(`Güncellenmiş İsim :\n`, `${devtrtag} ${devtrnick} , ${devtryas}`)
    .setFooter("Kayıt sistemi")
    .setColor("PURPLE")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kız"],
  permLevel: 0
};
exports.help = {
  name: "k"
};
//TlhaMert Youtube Kanalına Abone Ol ! 
   