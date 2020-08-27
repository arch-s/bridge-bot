const fs = require('fs');
const Discord = require('discord.js');
const {prefix, day} = require('./config.json');
const {token, bruh, reaction} = require('./private.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        if (message.author.tag === bruh) {
            return (Math.random() < 0.01 ? message.react(reaction) : 0);
        }
        return;
    }
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args && !args.length) {
        let reply = `No arguments provided`;
        if (command.usage) {
            reply += `\nThe command format is: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.channel.send('there was an error trying to execute that command')
    }
});

client.login(token);