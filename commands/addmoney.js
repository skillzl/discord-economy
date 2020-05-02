const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
   const ownerID = [
    "503983707502411787",
    "659038301331783680",
    "592528540444917760",
    "331345768759820289"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)
    message.channel.send(`<:tik:701192592741761164> ★ Added \`${args[1]}\` credits now **${user}** have \`${bal}\` credits**.**`)

};

module.exports.help = {
  name:"addmoney",
  aliases: ["am"]
}
