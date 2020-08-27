const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all of bridge-bot\'s commands or info about a specific command',
    aliases: ['commands', 'h'],
    usage: `<command_name>\``,
    execute(message, args) {
        const data = [];
        const {commands} = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:\n');
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nUse \`${prefix}help command_name\` to get info on a specific command.` +
                        ` Arguments shown between \`<>\` are optional`);

            return message.channel.send(data, {split:true});
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('error: command not found');
        }

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(',')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, {split: true});
    }
};