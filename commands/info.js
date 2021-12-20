const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Devon Roleplay")
        .setDescription("De nieuwste Roleplay server van Nederland!!!")
        .setColor("#ff0000")
        .addField("Bot naam", client.user.username)
        .setThumbnail('https://cdn.discordapp.com/attachments/896680536481882153/920003361657462814/IMG_6021.png')
        .setTimestamp()
        .setFooter("Devon Roleplay", 'https://cdn.discordapp.com/attachments/896680536481882153/920003361657462814/IMG_6021.png');

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "info",
    category: "info",
    description: "krijg je info"
}