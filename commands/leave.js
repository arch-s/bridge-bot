module.exports = {
    name: 'leave',
    aliases: ['l'],
    description: 'leave listed voice channels.\n' + 
                 'Use \`-a\` flag to leave all inhabited channels',
    args: true,
    usage: `[voice_channel_1] [voice_channel_2]`,
    group: 'music',
    async execute(message, args) {
        if (message.guild.me.voice !== undefined) {
            message.guild.me.voice.leave();
        }
        console.log(message.guild.me.voice);
    },
};