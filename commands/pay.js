const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.members.first() || message.author;

  let member = db.fetch(`money_${message.author.id}`)

  if (!user) {
      return message.channel.send(`Wrong usage, mention someone to give credits.`)
  }
  
  if (!args[1]) {
      return message.channel.send(`Wrong usage, specify an amount to give credits.`)
  }
  if (message.content.includes('-')) { 
      return message.channel.send(`Wrong usage, you can't pay someone negative credits.`)
  }

  if (member < args[1]) {
      return message.channel.send(`Wrong usage, you don't have that much credits.`)
  }

  message.channel.send(`You transfered \`${args[1]}\` credits to **${user.user.username}**'s balance.`)
  db.add(`money_${user.id}`, args[1])
  db.subtract(`money_${message.author.id}`, args[1])

}

module.exports.help = {
  name:"pay",
  aliases: ["transfer", "givemoney"]
}  
