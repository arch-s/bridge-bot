const {bruh, jail} = require('../index');

module.exports = {
    name: 'bonk',
    aliases: ['b', 'bonque'],
    description: 'send people to good engineer jail',
    usage: `@bonkee`,
    async execute(message, args) {
        if(message.mentions.members.size === 1) {
            //console.log(message.mentions.members.first());
            if(getUserFromMention(args[0].toLowerCase(), message.client.users.cache).tag === bruh)
                message.channel.send({files: ["images/bonque.jpg"]});
            else {
                message.channel.send({files: ["images/bonk.jpg"]});
            }
            jail.send(`${message.mentions.members.first()}, you have been sent to Good Engineer Jail. ` +
                            ` Because you are a good engineer 💜`); 
        }
        return;
    },
};

function getUserFromMention(mention, userCache) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return userCache.get(mention);
	}
}