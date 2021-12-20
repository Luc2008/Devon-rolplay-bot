const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    try {

        var prefix = botConfig.prefix;

        var respone = "**Bot Commands**\r\n\n";
        var general = "**__Algemeen__**\r\n";
        var info = "\n**__Informatie__**\r\n";

        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
                case "info":
                    info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
            }

        });

        respone += general + info;

        message.author.send(respone).then(() => {
            return message.reply("Alle commands kan je vinden in je privé berichten.");
        }).catch(() => {
            return message.reply("Je privé berichten zijn uitgeschakeld je hebt dus geen bericht ontvangen!");
        })

    } catch (error) {
        message.reply("er is iets mis gegaan!");
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    description: "Geeft dit menu"
}