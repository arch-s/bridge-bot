const ytdl = require('ytdl-core');
const {broadcast} = require('../index.js');

module.exports = {
    name: 'play',
    aliases: ['pl'],
    description: 'play music in voice channel you are in',
    args: false,
    usage: ``,
    group: 'music',
    execute(message, args) {
        //is user in voice channel
        if (!message.guild.voiceConnection)
            {
                return message.channel.send(`ERROR: cannot play `)
            }

        //is bride bot already in another channel?
            // if yes, join broadcast

            // else, join channel
    },
};
