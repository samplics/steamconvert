const { RichEmbed } = require("discord.js");
const config = require("../../config.json");
const SteamAPI = require('steamapi');
const api = new SteamAPI(config.steamkey);
var convert = require('steamidconvert')(config.steamkey);

module.exports = {
  name: "convert2",
  category: "tools",
  description: "convert steamid64 to profile info",
  usage: "<steamid64>",
  run: async(client, message, args) => {
    const steamid64 = args.join(" ");
    if(steamid64 == ""){
      message.reply(' you must include a steam vanity url. (Ex: 76561198853737959)');
    } else{
      api.getUserSummary(steamid64).then(summary => {
        var nickname = summary.nickname; var avatar = summary.avatar.large; var url = summary.url;
        var steamID = convert.convertToText(steamid64);
        const profileInfo = new RichEmbed()
          .setColor('#0099ff')
          .setTitle(`${nickname}'s Profile Information`)
          .setURL(url)
          .setThumbnail(avatar)
          .addField('SteamID', steamID)
          .addField('SteamID64', steamid64)
          .setTimestamp()
          .setFooter('Made by Sampli')

        message.channel.send(profileInfo);
      });
    };
  }
}
