const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  const ownerID = [
    "ownerID",
    "ownerID"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

  message.channel.send(`Taken \`${args[1]}\` credits from **${user}**'s balance.\n> Current balance: \`${bal}\` credits.`)

};


module.exports.help = {
  name:"removemoney",
  aliases: ["removecredits", "takemoney", "takecredits"]
}
