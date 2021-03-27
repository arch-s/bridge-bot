require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, day} = require('./config.json');
exports.prefix = prefix;

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

const token = process.env.TOKEN; 
const bruh = process.env.BRUH;
const reaction = process.env.REACTION;
const botID = process.env.BOT_ID;
const jailID = process.env.JAIL_ID;
const jail = client.channels.fetch(jailID);
exports.botID = botID;
exports.jailID = jailID;
exports.jail = jail;

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        if (message.author.tag === bruh) {
            return (Math.random() < 0.002 ? message.react(reaction) : 0);
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
            reply += `\nThe command format is: \`${prefix}${command.name} ${command.usage}`;
        }
        return message.channel.send(reply);
    }
    else if (command.args === false && args.length) {
        let reply = `Command doesn't require arguments`;
        if (command.usage) {
            reply += `\nThe command format is: \`${prefix}${command.name} ${command.usage}`;
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