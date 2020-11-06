const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.members.first() || message.author;
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  let bal = db.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  message.channel.send(`**${member.user.tag}** \`${bal}\` credits.`)
}; 


module.exports.help = {
  name:"balance",
  aliases: ["bal", "credits", "money"]
}
