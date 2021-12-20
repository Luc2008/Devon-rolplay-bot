const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //tempmute gebruiker tijd(h,m,s)

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");

    if (!args[0]) return message.reply("je moet een gebruiker meegeven");

    var mutePerson = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!mutePerson) return message.reply("kan de gebruiker niet vinden");

    if (mutePerson.permissions.has("MANAGE_MESSAGES")) return message.reply("Sorry je kan deze persoon geen mute geven");

    let muteRole = message.guild.roles.cache.get("922545859743318078");

    if (!muteRole) return message.channel.send("de mute rol bestaat niet!!");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("geef een tijd mee");

    if (mutePerson.roles.cache.some(role => role.name === "muted")) {
        message.channel.send("deze persoon is al gemuted!");
    } else {
        mutePerson.roles.add(muteRole.id);
        message.channel.send(`${mutePerson} is gemuted voor ${muteTime}`);

        setTimeout(() => {

            mutePerson.roles.remove(muteRole.id);

        }, ms(muteTime));
    }

}

module.exports.help = {
    name: "tempmute",
    category: "general",
    description: "kan iemand mute 'alleen staff kan dit'"
}