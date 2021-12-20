const { Client, Intents, Guild, Collection, GuildMember, } = require("discord.js");
const botConig = require("./botConfig.json");
const fs = require("fs");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`);

}

client.once("ready", () => {
    console.log(`${client.user.username} is online.`)
    client.user.setActivity("Devon Roleplay", { type: "PLAYING" })
});

client.on("guildMemberAdd", async (member) => {

    var role = member.guild.roles.cache.get("886573000713965576");

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("886573002240700438");

    if (!channel) return;

    channel.send(`Welkom bij onze Discord server, ${member}`);

    
});


client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("Er was een probleem tijdens het uitvoeren van deze command.");
    }

});

client.login(process.env.token);