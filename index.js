
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

const name = 'display-name'
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
    if (self) return;
    if (tags[name] === me) {
        if (message === banHammer) {
            for (let name of helpers.list) {
                client.say(channel, `/ban ${name}`)
                    .catch(err => console.log(err))
                await helpers.sleep(350)

            }
            console.log("Donezo")
        }
    }

    if (tags[name] === streamEle || tags[name] === streamLab) {
        message = message.toLowerCase()
        if (tags[name] === streamLab) {
            message = message.substring(0, message.length - 1)
        }
        for (let key in bots) {
            if (message.includes(bots[key])) {
                message = message.split(" ")
                for (let word in message) {
                    if (message[word].includes(bots[key])) {
                        console.log(`trying to ban ${message[word]}`)
                        client.say(channel, `/ban ${message[word]}`)
                        // updateNewList(message[word])
                        break
                    }
                }
            }
        }
    }
    if (message.includes("cutt.ly/")) {
        client.say(channel, `/ban ${tags[name]}`)
        console.log(`Get rekt ${tags[name]}`)
        await helpers.sleep(100)
    }
})
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
