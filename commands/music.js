const SpotifyAPI = require('spotify-web-api-node');
const {spotify_secret, spotify_id, redirect} = require('../private.json');
const spotify = new SpotifyAPI();

module.exports = {
    name: 'music',
    aliases: ['spotify', 'm'],
    args: true,
    description: 'play music in a voice channel and add songs to queue',
    usage: `who even knows\``,
    execute(message, args) {
        // toooooooodooooooooooooo
    },
};