const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let user = message.author;
    let author = await db.fetch(`hunt_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
    
        message.channel.send(`<:1665_disagree:675011520408584212> ${member.user.tag} aleardy hunted recently, try again in \`${time.minutes} minutes, ${time.seconds} seconds\`.`)
      } else {


    let hunt = ["**🐰 `(Rabbit)`**","**🐸 `(Frog)`**","**🐒 `(Monkey)`**","**🐔 `(Chicken)`**","**🐤 `(Baby Chick)`**","**🐺 `(Wolf)`**","**🐓 `(Rooster)`**", "**🦃 `(Turkey)`**", "**🐿 `(Chipmunk)`**","**🐃 `(Water Buffalo)`**","**🐂 `(Ox)`**","**🐎 `(Race Horse)`**","**🐖 `(Pig)`**","**🐍 `(Snake)`**","**🐄 `(Cow)`**"

    ]

    const huntresult = Math.floor((Math.random() * hunt.length));
    let amount = Math.floor(Math.random() * 2000) + 1;
        message.channel.send(`**HUNT MINIGAME:** - 🏹 \`${member.user.tag}\` has hunted a **-** ` + hunt[huntresult] + ` and earned \`${amount}\` credits`)

    db.add(`money_${user.id}`, amount)
    db.set(`hunt_${user.id}`, Date.now())

    };
    }


module.exports.help = {
  name:"hunt",
  aliases: ["h"]
}