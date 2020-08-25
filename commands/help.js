const { prefix } = require('../config.json');
const { MessageFlags } = require('discord.js');

module.exports = {
    name = 'help',
    description = 'List all of bridge-bots commands or info about a specific command',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nUse \`${prefix}help [command name]\` to get info on a specific command`);

            return message.channel.send(data, { split:true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('error: command not found');
        }

        data.push(`**Name: ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(',')}`);
        if (command.decription) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, {split: true});
    }
};