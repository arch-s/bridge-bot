module.exports = {
    name: 'dice',
    aliases: ['d'],
    args: true,
    description: 'rolls virtual dice. great for d&d. use \'a\' to roll with advantage and \'d\' for disadvantage',
    usage: `{number_of_rolls}d{dice_size} +/-{modifier} a/d`,
    async execute(message, args) {
        const msg = [];
        let vals = [];
        let total = 0;
        let advantage = 0;
        let advantage_msg = '';
        let modifier = 0;
        let modifier_msg = '';
        let idx = 0;
        let [rolls, dice] = args[0].split('d').map(val => parseInt(val));
        let max = 1;
        let min = dice;

        if (args[1]) {
            switch(args[1].charAt(0)) {
                case 'a':
                    advantage = 1;
                    break;
                case 'd':
                    advantage = -1;
                    break;
                case '+':
                case '-':
                    modifier = parseInt(args[1]);
                    break;
                default:
                    return message.channel.send(`Error: second argument not formatted correctly.` + 
                                                ` Use \`+/-\{modifier}\` or \`a/d\``);
            }
        }

        if (args[2]) {
            switch(args[2].charAt(0)) {
                case 'a':
                    advantage = 1;
                    break;
                case 'd':
                    advantage = -1;
                    break;
                case '+':
                case '-':
                    modifier = parseInt(args[2]);
                    break;
                default:
                    return message.channel.send(`Error: third argument not formatted correctly.` + 
                                                ` Use \`+/-\{modifier}\` or \`a/d\``);
            }
        }

        if (advantage == 1) advantage_msg = ' with advantage';
        if (advantage == -1) advantage_msg = ' with disadvantage';
        modifier_msg = (modifier < 0) ? ` - ${Math.abs(modifier)}` : ` + ${modifier}`;

        if (!dice) return message.channel.send(`Error: argument not formatted correctly.` + 
                                                ` Use \`{number_of_rolls}d{dice_size}\``);
        if (rolls > 1000) return message.channel.send(`Error: stop playing QA`);
        if (rolls == 1) msg.push(`rolling d${dice}:`)
        else msg.push(` rolling d${dice} ${rolls} times${advantage_msg}:`)

        for (let i = 0; i < rolls; i++) {
            let result = (rand(1, dice));
            if (advantage == 0) total += result;
            else if (advantage == 1) {
                if (result > max) {
                    max = result;
                    idx = i;
                }
            }
            else if (advantage == -1) {
                if (result < min) {
                    min = result;
                    idx = i;
                }
            }
            if (dice == 20) result = critical(result);
            vals.push(result);
        }
        total = total.toString();
        if (advantage != 0) {
            total = vals[idx];
            vals = vals.map((val, index) => ((index == idx) ? val : `~~${val}~~`));
        }
        if (modifier != 0) msg.push(`(${vals.toString()})${modifier_msg}`);
        else msg.push(`(${vals.toString()})`);
        msg.push(`Total: ${returnInt(total) + modifier}`);
        try {
            return message.reply(msg);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command');
        }
    },
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function critical(roll) {
    if (roll == 1 || roll == 20) {
        return `**${roll.toString()}**`;
    }
    return roll.toString();
}

function returnInt(val) {
    if (val.charAt(0) != "*") {
        return parseInt(val);
    }
    else return parseInt(val.slice(2, -2));
}