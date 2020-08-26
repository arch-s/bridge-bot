const emoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

module.exports = {
    name: 'poll',
    args: true,
    aliases: ['p'],
    description: 'Creates polls for users via reacts',
    usage: `{poll title} [option 1] [option 2] [option 3]\``,
    execute(message, args) {
        if (!args[0].startsWith('{')) {
            return message.channel.send(`Error: poll title is not within {}`);
        }
        const msg = [];
        let msgItem = args.shift().slice(1);
        let inOption = false;
        let optionNum = 0;
        while(args.length) {
            if (args[0].endsWith('}')) {
                msgItem += " " + args.shift().slice(0, -1);
                msg.push(msgItem);
            }
            else if (args[0].startsWith('[')) {
                if (inOption) {
                    return message.channel.send(`Error: a poll option contains another option`);
                }
                msgItem = "\n" + emoji[optionNum] + " " + args.shift().slice(1);
                inOption = true;
            }
            else if (args[0].endsWith(']')) {
                if (!inOption) {
                    return message.channel.send(`Error: ended option with ']' without starting with '['`);
                }
                msgItem += " " + args.shift().slice(0, -1);
                msg.push(msgItem);
                optionNum++;
                inOption = false;
            }
            else {
                msgItem += " " + args.shift();
            }
        }
        return message.channel.send(msg).then(sent => {
            for (let i = 0; i < optionNum; i++) {
                sent.react(emoji[i]);
            }
        })
    }
};