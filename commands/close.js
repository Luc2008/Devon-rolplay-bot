const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const categoryID = "886573001817092119";

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("je kan dit niet doen");

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("de ticket is gemarkeerd als **compleet**")
            .setFooter("Ticket Gesloten");

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "『ticket-logs』");
        if (!ticketChannel) return message.reply("Kanaal bestaat niet!")

        return ticketChannel.send({ embeds: [embedTicket] });

    } else {
       return message.channel.send("Gelieve dit commando in een ticket kanaal uit te voeren!!");
    }

}

module.exports.help = {
    name: "close",
    category: "general",
    description: "sluit een ticket"
}