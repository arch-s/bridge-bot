const index = require('../index');
const bruh = index.bruh;
const jail = index.jail;

module.exports = {
    name: 'bonk',
    aliases: ['b', 'bonque'],
    description: 'send people to good engineer jail',
    usage: `@bonkee`,
    async execute(message, args) {
            if(message.mentions.members.size === 1) {
                
                if(message.mentions.members.first() === bruh)
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