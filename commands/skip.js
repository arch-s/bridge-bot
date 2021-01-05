const ytdl = require('ytdl-core');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    description: 'skips to next track in queue. Use \`-n\` to skip \`n\` tracks forward',
    usage: `<-n>`,
    group: 'music',
    execute(message, args) {
        //TODO: skip 'n' tracks
    },
};