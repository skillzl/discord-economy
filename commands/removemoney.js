const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  const ownerID = [
    "503983707502411787",
    "659038301331783680"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

    message.channel.send(`<:1665_disagree:675011520408584212> Removed \`${args[1]}\` credits his balance is: \`${bal}\` credits.`)

};


module.exports.help = {
  name:"removemoney",
  aliases: ["rm"]
}
