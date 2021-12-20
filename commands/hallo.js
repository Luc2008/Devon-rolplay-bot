module.exports.run = async (bot, message, args) => {

    return message.channel.send("Halllloooooo");

}

module.exports.help = {
    name: "hallo",
    category: "general",
    description: "Zegt HALLLOOO"
}