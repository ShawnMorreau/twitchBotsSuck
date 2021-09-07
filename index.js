
const tmi = require('tmi.js');
require('dotenv').config()
const helpers = require("./helpers");
const OUATH = process.env.OUATH;

const me = process.env.ME;

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: me,
        password: OUATH
    },
    channels: []
});
client.connect();

const name = 'display-name'
/*
    If I start adding more commands, I'll likely create a commands object to store them
*/
const banHammer = "!doTheThing"
const pyramid = "!p"
client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    if (tags[name] === me) {
        if (message === banHammer) {
            for (let name of helpers.list) {
                client.say(channel, `/ban ${name}`)
                .catch(err => console.log(err))
                await helpers.sleep(200)
            }
            console.log("Donezo")
        }
        if (message.includes(pyramid)) {
            message = message.split(" ")
            const emote = message[1] + " "
            const num = Math.floor(parseInt(message[2])/2)
           
            for(let i = 0; i <= num; i++){
                client.say(channel,`${emote.repeat(i + 1)}`)
                await helpers.sleep(200)
            }
            for(let i = num - 1; i >=0; i--){
                client.say(channel, `${emote.repeat(i + 1)}`)
                await helpers.sleep(200)
            }
        }
    }
    if(message.includes("cutt.ly/")){
        client.say(channel, `/ban ${tags[name]}`)
        console.log(`Get rekt ${tags[name]}`)
    }
})


