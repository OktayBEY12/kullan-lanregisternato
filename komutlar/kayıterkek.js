   
const devtr = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(samet => samet.id === "720728599136829491"); //Erkek Rolü
  const misafir = message.guild.roles.find(journey => journey.id === "720728599778557973"); //Kayıtsız Rol
  const log = message.guild.channels.find(samet => samet.id === "720728627209044060"); // Log Kanalı
  const devtrtag = "";
  if(!message.member.roles.array().filter(r => r.id === "720728590953480255")[0]) { // Yetkili Id
    return message.channel.send("Yetkili Değilsen Uza");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Kullanıcı Etiketle")
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
    .setFooter("Kayıt Sistemi")
    .setColor("BLUE")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek"],
  permLevel: 0
};
exports.help = {
  name: "e"
};
//TlhaMert Youtube Kanalına Abone Ol ! 
   