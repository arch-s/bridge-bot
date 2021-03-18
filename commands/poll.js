const emoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹'];

module.exports = {
    name: 'poll',
    args: true,
    aliases: ['p'],
    description: 'Creates polls for users via reacts',
    usage: `{poll title} [option 1] [option 2] [option 3]`,
    async execute(message, args) {
        message.delete();
        if (!args[0].startsWith('{')) {
            return message.channel.send(`Error: poll title is not within {}`);
        }
        const msg = [];
        let inTitle = true;
        let msgItem = `Poll: ${args.shift().slice(1)}`;
        if (msgItem.endsWith('}')) {
            msgItem = `${msgItem.slice(0, -1)}\n`;
            msg.push(msgItem);
            inTitle = false;
        }
        let inOption = false;
        let optionNum = 0;
    
        //input parsing and sanitisation

        while(args.length && (msg.length <= emoji.length || !msg.length)) {
            if (args[0].endsWith('}') && inTitle) {
                if (args[0].slice(0, -1).includes('}')) {
                    return message.channel.send(`Error: tried to end poll title in the middle of a word`);
                }
                msgItem += ` ${args.shift().slice(0, -1)}\n`;
                msg.push(msgItem);
                inTitle = false;
            }
            else if (!inTitle) {
                if (args[0].startsWith('[')) {
                    if (inOption) {
                        return message.channel.send(`Error: a poll option contains another option`);
                    }
                    else if (args[0].slice(1).includes('[')) {
                        return message.channel.send(`Error: a poll option contains another poll option`);
                    }
                    else if (args[0].slice(0, -1).includes(']')) {
                        return message.channel.send(`Error: a poll option ends in the middle of a word`);
                    }
                    else if (args[0].endsWith(']')) {
                        msgItem = `${emoji[optionNum]} ${args.shift().slice(1, -1)}`;
                        msg.push(msgItem);
                        optionNum++;
                        inOption = false;
                    }
                    else {
                        msgItem = `${emoji[optionNum]} ${args.shift().slice(1)}`;
                        inOption = true;
                    }
                }
                else if (args[0].endsWith(']')) {
                    if (!inOption) {
                        return message.channel.send(`Error: ended option with ']' without starting with '['`);
                    }
                    else if (args[0].slice(1).includes('[')) {
                        return message.channel.send(`Error: a poll option contains another poll option`);
                    }
                    else if (args[0].slice(0, -1).includes(']')) {
                        return message.channel.send(`Error: a poll option ends in the middle of a word`);
                    } 
                    msgItem += ` ${args.shift().slice(0, -1)}`;
                    msg.push(msgItem);
                    optionNum++;
                    inOption = false;
                }
                else if (args[0].includes('[')) {
                    return message.channel.send(`Error: a poll option contains another poll option`);
                }
                else if (args[0].includes(']')) {
                    return message.channel.send(`Error: a poll option ends in the middle of a word`);
                }
                else {
                    msgItem += ` ${args.shift()}`;
                }
            }
            else if (args[0].includes('[') || args[0].includes(']')
                    || args[0].includes('{') || args[0].includes('}')) {
                return message.channel.send(`Error: a poll title contains poll option or poll title`);
            } 
            else {
                msgItem += ` ${args.shift()}`;
            }
        }

        // spit out poll message

        return message.channel.send(msg).then(sent => {
            for (let i = 0; i < optionNum; i++) {
                sent.react(emoji[i]);
            }
        })
    }
};