const ytdl = require('ytdl-core');
const SpotifyAPI = require('spotify-web-api-node');
const {spotify_secret, spotify_id, redirect} = require('../private.json');
const spotify = new SpotifyAPI();
const {queue} = require('./queue.js');

module.exports = {
    name: 'add',
    aliases: ['a'],
    description: 'adds the youtube URLs to the music queue',
    args: true,
    usage: `youtube_URL_1 youtube_URL_2`,
    group: 'music',
    execute(message, args) {
        //TODO: add the music to queue
    },
};