module.exports.run = async (bot, message, args) => {

    return message.channel.send("de server in nu offline!");

}

module.exports.help = {
    name: "serverstatus",
    category: "info",
    description: "Kijkt of de server aanstaat"
}