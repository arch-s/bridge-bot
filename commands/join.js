module.exports = {
    name: 'join',
    aliases: ['j'],
    description: 'join listed voice channels.\n' + 
                 'Use \`-a\` flag to join all inhabited channels',
    args: true,
    usage: `voice_channel_1 voice_channel_2`,
    group: 'music',
    execute(message, args) {
        //TODO: join voice channels
    },
};