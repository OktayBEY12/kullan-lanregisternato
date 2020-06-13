const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
//
                  

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.reply(" En Az \`1 - 100\` Arasında Bir Tam Sayı Değeri Girmelisiniz.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(` **__Silindi__** : **${args[0]}**`).then(msg => msg.delete(7500));
  });
}

module.exports.help = {
  name: "sil"
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["temizle"],
  permLevel: 0,
};

exports.help = {
  name: 'sil',
  description: '',
  usage: 'sil',
}
//TlhaMert Youtube Kanalına Abone Ol ! 