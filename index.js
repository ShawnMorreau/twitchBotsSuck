
const tmi = require('tmi.js');
const { followBotExtractor } = require('./followBotExtractor');
require('dotenv').config()
const {sleep} = require("./helpers");
const {hossList,dumbBots,notMyList} = require("./lists")
const OUATH = process.env.OUATH;

const me = process.env.ME;
const streamEle = "StreamElements";
const streamLab = "Streamlabs";
const botJSON = require("./bots.json")

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: me,
        password: OUATH
    },
    channels: ["jenastra","m0wgliii_","eddboiii","rambang"]
// "danwitdaplan_"
});
client.connect();


const nameIdx = 4;
const bots = {
    hosss: "hoss00312",
    hossss: "hoss0312",
    hoss: "hoss00312_",
    hoss2: "00312_",
    hoss4: "_00312",
    hoss3: "hoss_",
    manolia: "manolia_",
    lunar: "lunar_",
}

client.on('message', async (channel, tags, message, self) => {
    const name = tags['display-name']
    if (self) return;
    if (name === me) {
        switch (message) {
            case "!doTheThing":
                banList(notMyList, channel)
                break
            case "!hoss":
                banList(hossList, channel)
                break
            case "!btb":
                banList(dumbBots, channel)
                break
            case "!banEm":
                console.log(botJSON.bots)
                await followBotExtractor()
                banList(botJSON.bots, channel)
                break
        }
    }
    else if (name === streamEle) {
        message = message.toLowerCase()
        
        for (let key in bots) {
            if (message.includes(bots[key])) {
                message = message.split(" ")
                console.log(`${message[nameIdx]}`)
                client.say(channel, `/ban ${message[nameIdx]}`)
                client.say("4bo0m", `/ban ${message[nameIdx]}`)
                break
            }
        }
    }
    //can't keep appending otherwise it will get too cluttered. likely do it as a map again
    else if(message.includes("guardlink.org/") || message.includes("vk.cc/")){
        client.say(channel, `/ban ${message[name]}`)
    }
})

const banList = async (list, channel) => {
    console.log("Started")
    for (let id of list) {
        client.say(channel, `/ban ${id}`)
        await sleep(350)
    }
    console.log("Donezo")
}
