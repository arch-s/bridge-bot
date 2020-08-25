module.exports = {
    name: 'dice',
    aliases: ['dd'],
    args: true,
    description: 'rolls virtual dice. great for d&d',
    usage: '<dice size> <number of rolls>',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    },
};