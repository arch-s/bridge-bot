module.exports = {
    name: 'reload',
    aliases: ['refresh', 'r'],
    description: 'Reloads a command',
    usage: `command_name`,
    execute(message, args) {
        if (!args.length) return message.channel.send(`No command passed to reload`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send(`Command ${commandName} not found with that name or alias`)
        
        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` reloaded`)
        }
        catch (error) {
            console.log(error);
            message.channel.send(`Unable to reload command ${command.name}\`:\n\`${error.message}\``);
        }
    },
};