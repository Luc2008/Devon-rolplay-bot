const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Discord Server Info")
        .setDescription("Discord Server Info, kijk wanneer je gejoint bent!")
        .setColor("#ff0000")
        .addFields(
            { name: "Bot naam", value: client.user.username },
            { name: "Je bent de server gejoined op", value: message.member.joinedAt.toString() },
            { name: "Totaal members", value: message.guild.memberCount.toString() }
        );

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    description: "kijkt wanneer je gejoint ben en hoeveel members we hebben"
}