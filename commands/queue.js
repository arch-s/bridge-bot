const ytdl = require('ytdl-core');
const queue = new Map();

module.exports = {
    name: 'queue',
    queue: queue,
    aliases: ['q'],
    description: 'view the current queue',
    args: false,
    usage: ``,
    group: 'music',
    execute(message, args) {
        //TODO: view queue
    },
};