const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    //!kick naam redenen

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("je kan dit niet doen");

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("Geen Perms");

    if (!args[0]) return message.reply("Gelieve een gebruiker op te geven!!");

    if (!args[1]) return message.reply("Gelieve een reden mee te geven!!");

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!kickUser) return message.reply("Sorry kan de opgegeven gebruiker niet vinden.");

    if (kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply('je kan deze persoon niet kicken!');

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Gelieve Te reageren ninnen 20 seconden")
        .setDescription(`wil je ${kickUser} kicken?`);

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gekickt:** ${kickUser} (${kickUser.id})
    **Gekickt door:** ${message.author}
    **reden:** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();


    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✅", "❌"];

        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();

            if (emojiDetails.emoji.name === "✅") {

                msg.delete()

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`er is iets mis gegaan`)
                });

                message.channel.send({ embeds: [embed] })

            } else if (emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send("Kick geanulleerd").then(msg => {
                    message.delete();
                    setTimeout(() => msg.delete(), 5000);
                });

            }
        });
    });

}

module.exports.help = {
    name: "kick",
    category: "general",
    description: "geeft kicks alleen 'alleen staff kan dit'"
}