const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
   const ownerID = [
    "botOwner",
    "botOwner"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)
    message.channel.send(`Added \`${args[1]}\` credits to **${user}**'s balance.\n> Current balance: \`${bal}\` credits.`)

};

module.exports.help = {
  name:"addmoney",
  aliases: ["addcredits"]
}
