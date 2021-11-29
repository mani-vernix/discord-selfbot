//======================== CONSTS ===========================
const Discord = require('discord.js-self');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = (config.prefix);//put prefix in config.json
const owner = (config.owner);//put your id in config.json
//=================== READY ========================
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! . Im Ready :)`);
});
//===================== !status [StatusType] =====================
client.on('message', message => {
    let messageArry = message.content.split(" ")
    let cmd = messageArry[0]
    let status = messageArry[1]

    if (cmd == `${prefix}status`) {
        if (message.author.id !== `${owner}`) return false;
        let statusText = message.content.replace(`${cmd} ${status}`, ``)

        if (status == "dnd" || status == "online" || status == "idle" || status == "invisible") {
            client.user.setPresence({
                status: `${status}`
            }).then(message.reply(`**Successful**\nYour Status Has Been Changed To : \`${status}\``))
        }
    }
});
//============================ !afk ================================
client.on('message', message => {
    let messageArry = message.content.split(" ")

    if (message.author.id !== `${owner}`) return false;
    if (message.content.startsWith(`${prefix}afk`)) {
        client.user.setPresence({
            status: 'idle'
        }).then(message.reply(`**Successful**\nNow you're in afk mode and Your Status Has Been Changed To : \`idle\``))
    }
});
//============================= !info =============================
client.on('message', message => {
    if (message.author.id !== `${owner}`) return false;
    if (message.content.startsWith(`${prefix}info`)) {
        message.reply(`**Your Status Is :** \`${client.user.presence.status}\``)
    }
});
//======================= !join [VoiceChannel-id] =======================
client.on("message", (message) => {
    if (message.author.id !== `${owner}`) return false;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const VC = message.content.slice(prefix.length).trim().split(' ');
    const command = VC.shift().toLowerCase();
    const channel = client.channels.cache.get(`${VC}`);
    if (command === `join`) {
        if (!channel) return;
        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);
            connection.voice.setSelfMute(true);
        }).catch(e => {
            console.log(e)
        });
    }
});
//====================== LOGIN ======================
client.login(config.token);//put token in config.json