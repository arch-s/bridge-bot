const SpotifyAPI = require('spotify-web-api-node');
const {spotify_secret, spotify_id, redirect} = require('../private.json');
const spotify = new SpotifyAPI();
const ytdl = require('ytdl-core');
const queue = new Map();

module.exports = {
    name: 'music',
    aliases: ['spotify', 'm'],
    args: true,
    description: 'play music in a voice channel and add songs to queue',
    usage: `who even knows\``,
    execute(message, args) {
        switch (args[0]) {
            case 'play':
                //play the queue
                break;
            case 'pause':
                //pause the music playing
                break;
            case 'add':
                //add song/url to queue
                break;
            case 'remove':
                //drop a song in the queue
                break;
            case 'queue':
                //view current queue
                break;
            case 'volume':
                //set stream volume level
                break;
            case 'clear':
                //clear current queue
                break;
            case 'broadcast':
                //play on all inhabited voice channels
                break;
            default:
                return message.channel.send(`Did not use a valid \`!music\` command`);
        }
    },
};