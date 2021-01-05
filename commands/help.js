const {prefix} = require('../config.json');
const {botID} = require('../private.json');

module.exports = {
    name: 'help',
    description: 'List all of bridge-bot\'s commands or info about a specific command',
    aliases: ['commands', 'h'],
    usage: `<command_name>\``,
    async execute(message, args) {
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
        if (name == "me") return message.reply("only Jesus can help you now");
        try {
            switch (getUserFromMention(name, message.client.users.cache).id) {
                case botID:
                    return message.reply(`perfection does not need help`);
                case message.author.id:
                    return message.reply("only Jesus can help you now");
                default:
                    if (getUserFromMention(name, message.client.users.cache)) return message.channel.send(`${name} do not panic, you are being helped`);
                    break;
            }
        }
        catch (error) {};
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
            return message.reply('error: command not found');
        }

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(',')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

        message.channel.send(data, {split: true});
    }
};

function getUserFromMention(mention, userCache) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return userCache.get(mention);
	}
}