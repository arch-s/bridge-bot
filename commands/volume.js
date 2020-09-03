const ytdl = require('ytdl-core');

module.exports = {
    name: 'volume',
    aliases: ['v'],
    description: 'sets volume of bridge bot music player. Use \`min\`, \`max\`,' + 
                 'or a value between \`0\` and \`100\`',
    args: true,
    usage: `volume_level`,
    group: 'music',
    execute(message, args) {
        //TODO: set the volume
    },
};