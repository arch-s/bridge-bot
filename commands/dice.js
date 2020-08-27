function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    name: 'dice',
    aliases: ['dd'],
    args: true,
    description: 'rolls virtual dice. great for d&d',
    usage: `\${number_of_rolls}d\${dice_size}\``,
    execute(message, args) {
        const msg = [];
        let total = 0;
        let [rolls, dice] = args[0].split('d').map(val => parseInt(val));
        
        if (!dice) return message.channel.send(`Error: argument not formatted correctly.` + 
                                                ` Use \`\${number_of_rolls}d\${dice_size}\``);
        if (rolls == 1) msg.push(`Rolling d${dice}:\n`)
        else msg.push(`Rolling d${dice} ${rolls} times:\n`)
        for (let i = 0; i < rolls; i++) {
            let result = (rand(1, dice));
            total += result;
            msg.push(result);
        }
        if (!(rolls == 1)) msg.push(`\n Total: ${total}`);
        try {
            return message.channel.send(msg);
        }
        catch (error) {
            console.error(error);
            message.channel.send('there was an error trying to execute that command');
        }
    },
};