  const config = require("./config.json");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://red-eco.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const client = new Discord.Client({ disableEveryone: true });
const prefix = config.prefix;
const token = config.token;


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});


client.on("ready", async () => {
  console.log(`${client.user.username} is ready for action!`);
  if (config.activity.streaming == true) {
    client.user.setActivity(config.activity.game, {url: 'https://twitch.tv/username'});
  } else {
    client.user.setActivity(config.activity.game, {type: 'WATCHING'});//PLAYING, LISTENING, WATCHING
    client.user.setStatus('dnd'); // dnd, idle, online, invisible
  }
});



bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let commandfile;
  if (bot.commands.has(cmd)) {
    commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }

  if (!message.content.startsWith(prefix)) return;

  try {
    commandfile.run(bot, message, args);
  } catch (e) {}
});


bot.login(token);
