const {broadcast} = require('../index.js');

module.exports = {
    name: 'join',
    aliases: ['j'],
    description: 'join listed voice channels.\n' + 
                 'Use \`-a\` flag to join all inhabited channels',
    args: true,
    usage: `[voice channel 1] [voice channel 2]`,
    group: 'music',
    async execute(message, args) {
        const channelList = message.guild.channels.cache
                        .filter(channel => channel.type == "voice");
        const channels = [];
        let inName = false;
        let msgItem = ``;
        
        //input parsing and sanitisation

        while (args.length) {
            if (args[0].startsWith('[')) {
                if (inName) return message.channel.send(`Error: channel name` +
                    `contains another name`);
                else if (args[0].length == 1) {
                    inName = true;
                    msgItem = '';
                    args.shift();
                }
                else if (args[0].slice(1).includes('[')) return message.channel
                    .send(`Error: channel name contains another name`);
                else if (args[0].slice(0, -1).includes(']')) return message.channel
                    .send(`Error: tried to end channel name mid-word`);
                else if (args[0].endsWith(']')) {
                    msgItem = args.shift().slice(1, -1);
                    channels.push(msgItem);
                }
                else {
                    msgItem = args.shift().slice(1);
                    inName = true;
                }
            }
            else if (args[0].endsWith(']')) {
                if (!inName) return message.channel.send(`Error: ended channel name` +
                    `without starting it`);
                else if (args[0].length == 1) {
                    args.shift();
                    channels.push(msgItem);
                }
                else if (args[0].slice(1).includes('[')) return message.channel
                    .send(`Error: tried to start channel name mid-word`);
                else if (args[0].slice(0, -1).includes(']')) return message.channel
                    .send(`Error: tried to end channel name mid-word`);
                else {
                    msgItem += ` ${args.shift().slice(0, -1)}`;
                    channels.push(msgItem);
                }
            }
            else if (args[0].slice(1, -1).includes('[') || args[0].slice(1, -1).includes(']')) {
                return message.channel.send(`Error: a channel name contains another channel name`);
            }
            else {
                msgItem += ` ${args.shift()}`;
            }
        }
        const selectedChannels = channelList.filter(channel => channels.includes(channel.name));
        console.log(selectedChannels.size);
        if (!selectedChannels.size) return message.channel.send(`Error: ` + 
            `chosen voice channels do not exist`);
        
        selectedChannels.forEach(async channel => {
            connection = await channel.join();
            connection.play(broadcast);
        });
    },
};