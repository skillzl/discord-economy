const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => { 

    let user = message.author;
    let author = await db.fetch(`work_${`member.user.tag`}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("#363940")
        .setDescription(`<:1665_disagree:675011520408584212> You have already worked recently.\n\n<:1665_disagree:675011520408584212> Try again in \`${time.minutes}m ${time.seconds}s\` `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic','Farmer','Trucker','Fisher']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 300) + 1;
        let embed1 = new Discord.RichEmbed()
        .setColor("#363940")
        .setDescription(`<:image0AdrianAlpha2:693534596645781544> You worked as a \`${replies[result]}\` and earned \`${amount}\` credits.`);
        message.channel.send(embed1)
        
        db.add(`money_${`member.user.tag`}`, amount)
        db.set(`work_${`member.user.tag`}`, Date.now())
    };
}



module.exports.help = {
  name:"work",
  aliases: ["wr"]
}
