module.exports = {
    name: 'leave',
    aliases: ['l'],
    description: 'leave listed voice channels.\n' + 
                 'Use \`-a\` flag to leave all inhabited channels',
    args: true,
    usage: `voice_channel_1 voice_channel_2`,
    group: 'music',
    execute(message, args) {
        //TODO: leave voice channels
    },
};