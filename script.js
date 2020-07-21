const { Client, RichEmbed, Collection } = require('discord.js');
const client = new Client({
  disableEveryone: false
});
const config = require("./config.json");
const SteamAPI = require('steamapi');
const api = new SteamAPI(config.steamkey);
var fs = require('fs');
var convert = require('steamidconvert')(config.steamkey);

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
        status: "online",
        game: {
            name: "convert a steamid",
            type: "Playing"
        }
    });
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command)
    command.run(client, message, args);

});

client.login(config.token);
