const { RichEmbed } = require("discord.js");
const config = require("../../config.json");
const SteamAPI = require('steamapi');
const api = new SteamAPI(config.steamkey);
var convert = require('steamidconvert')(config.steamkey);

module.exports = {
  name: "convert",
  category: "tools",
  description: "convert steam vanity url to profile info",
  usage: "<vanity url>",
  run: async(client, message, args) => {
    const vanity = args.join(" ");
    if(vanity == ""){
      message.reply(' you must include a steam vanity url. (Ex: Sampli)');
    } else{
      convert.convertVanity(vanity, function(err, res) {
        if(err){
          console.log(err);
        } else{
          api.getUserSummary(res).then(summary => {
            var nickname = summary.nickname; var avatar = summary.avatar.large; var url = summary.url;
            var steamID = convert.convertToText(res);
            var steamID64 = res;
            const profileInfo = new RichEmbed()
              .setColor('#0099ff')
              .setTitle(`${nickname}'s Profile Information`)
              .setURL(url)
              .setThumbnail(avatar)
              .addField('SteamID', steamID)
              .addField('SteamID64', steamID64)
              .setTimestamp()
              .setFooter('Made by Sampli')

            message.channel.send(profileInfo);
          });
        }
      });
    }
  }
}
