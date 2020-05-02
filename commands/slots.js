const slotItems = ["🍇", "🎰", "🍌", "🍉", "🍋", "💸", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
 
   let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    if (!money) return message.channel.send(`★ **${user.username}**, specify an amount of credits.`);
    if (money > moneydb) return message.channel.send(`★ **${user.username}**, you are betting more than you have.`);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n★ You won \`${money}\` credits.`)
            .setColor("#363940")
        message.channel.send(slotsEmbed1)

        db.add(`money_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n★ You lost \`${money}\` credits.`)
            .setColor("#363940")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${user.id}`, money)
    }

}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }