
const tmi = require('tmi.js');
const fs = require("fs")
require('dotenv').config()
const helpers = require("./helpers");
const OUATH = process.env.OUATH;

const me = process.env.ME;
const streamEle = "StreamElements";
const streamLab = "Streamlabs";

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

const banHammer = "!doTheThing"

const bots = {
    hosss: "hoss00312",
    hoss: "hoss00312_",
    hoss2: "00312_",
    hoss4: "_00312",
    hoss3: "hoss_",
    manolia: "manolia_",
    lunar: "lunar_"
}
client.on('message', async (channel, tags, message, self) => {
    const name = tags['display-name']
    if (self) return;
    if (name === me) {
        if (message === banHammer) {
            for (let id of helpers.list) {
                client.say(channel, `/ban ${id}`)
                    .catch(err => console.log(err))
                await helpers.sleep(350)

            }
            console.log("Donezo")
        }
    }

    if (name === streamEle || name === streamLab) {
        message = message.toLowerCase()
        if (name === streamLab) {
            /*
                For the streams I'm doing this in, some have a StreamLabs following 
                message that concats a ! at the end of the message
            */
            message = message.substring(0, message.length - 1)
        }
        if (message.includes(bots[key])) {
            message = message.split(" ")
            for (let key in bots) {
                for (let word in message) {
                    if (message[word].includes(bots[key])) {
                        console.log(`${message[word]}`)
                        client.say(channel, `/ban ${message[word]}`)
                        // updateNewList(message[word])
                        break
                    }
                }
            }
        }
    }
    if (message.includes("cutt.ly/")) {
        client.say(channel, `/ban ${name}`)
        console.log(`Get rekt ${name}`)
        await helpers.sleep(100)
    }
})
// attempt at automation, for adding all the bots caught in my autoban
// const updateNewList = (bot) => {
//     fs.readFile('bots.json', 'utf8', function readFileCallback(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             obj = JSON.parse(data); //now it an object
//             obj.bots.push({ name: bot }); //add some data
//             json = JSON.stringify(obj); //convert it back to json
//             fs.writeFile('bots.json', json, 'utf8', (err) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(`wrote to file`)
//                 }
//             })
//         }
//     })
// }
