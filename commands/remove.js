const ytdl = require('ytdl-core');

module.exports = {
    name: 'add',
    aliases: ['r'],
    description: 'removes songs from the music queue. Use \`-c\` flag to clear whole queue',
    args: true,
    usage: `song_1 song_2 <-c>`,
    group: 'music',
    execute(message, args) {
        //TODO: remove music from queue
    },
};