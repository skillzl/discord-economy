const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils, iUser) => {

  let user = message.mentions.members.first() || message.author;
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  let bal = db.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  message.channel.send(`<:tik:701192592741761164> ★ | Here is \`${member.user.tag}\` balance:\n\n**★ Name**: \`${member.user.tag}\`.\n**★ Balance**: \`${bal}\` credits.`)
}; 


module.exports.help = {
  name:"balance",
  aliases: ["bal"]
}