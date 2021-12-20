module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");

    if (!args[0]) return message.reply("je moet een gebruiker meegeven");

    var mutePerson = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!mutePerson) return message.reply("kan de gebruiker niet vinden");

    if (mutePerson.permissions.has("MANAGE_MESSAGES")) return message.reply("Sorry je kan deze persoon geen mute geven");

    let muteRole = message.guild.roles.cache.get("922545859743318078");

    if (!muteRole) return message.channel.send("de mute rol bestaat niet!!");

    if (!mutePerson.roles.cache.some(role => role.name === "Muted")) {
        message.channel.send("deze persoon is al geunmuted!");
    } else {
        mutePerson.roles.remove(muteRole.id );
        message.channel.send(`${mutePerson} is geunmuted`);
    }

}

module.exports.help = {
    name: "unmute",
    category: "general",
    description: "kan iemand unmute 'alleen staff kan dit'"
}