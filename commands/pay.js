const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

  let user = message.mentions.members.first() || message.author;

  let member = db.fetch(`money_${message.author.id}`)

  if (!user) {
      return message.channel.send(`<:tik:701192592741761164> \`${user.username}\`, mention someone to give credits.`)
  }
  
  if (!args[1]) {
      return message.channel.send(`<:tik:701192592741761164> \`${user.username}\`, specify an amount to give credits.`)
  }
  if (message.content.includes('-')) { 
      return message.channel.send(`<:tik:701192592741761164> \`${user.username}\`, you can't pay someone negative credits.`)
  }

  if (member < args[1]) {
      return message.channel.send(`<:tik:701192592741761164> \`${user.username}\`, you don't have that much credits.`)
  }

  message.channel.send(`<:tik:701192592741761164> You gived to: \`${user.user.username}\` \`${args[1]}\` credits.`)
  db.add(`money_${user.id}`, args[1])
  db.subtract(`money_${message.author.id}`, args[1])

}

module.exports.help = {
  name:"pay",
  aliases: ["pay"]
}  