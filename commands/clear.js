module.exports.run = async (bot, message, args) => {

    // !clear aantal

    if (!message.member.permissions.has("MANAGE_MESSEGES")) return message.reply("jij kan dit neit doen");

    if (!args[0]) return message.reply("geef een aantal op dat je wilt weghalen");

    if (parseInt(args[0])) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (parseInt(args[0]) == 1) {
                message.channel.send("ik heb 1 bericht verwijderd.").then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 3000);
                });
            } else {
                message.channel.send(`ik heb ${parseInt(args[0])} berichten verwijderd`).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 3000);
                });
            }

        }).catch(err => {
            return message.reply("geef een getal groter dan 0 op!");
        });

    } else {
        return message.reply("geef een getal op");
    }

}

module.exports.help = {
    name: "clear",
    category: "general",
    description: "verwijderd alle berichten 'alleen staf kan dit.'"
}