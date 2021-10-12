const fs = require("fs")
const pulledBots = require("./bots.json")
/*
  Since new bots have been popping up and I dislike copy pasting.. If the bot is off I would have to
  copy paste each name in order to /ban ${name}, I want to be able to just copy the wall of follows 
  into a file, run the command and pass the list to banList()... Gonna make this very tailored to the people
  that I mod so I will be following ModeratorVerifiedStreamElements:Thank you for following gunu5 :) I appreciate the support.
  as a guide for a message
*/
const regex = /\d\d:\d\d/g
const firstLine = 'ModeratorVerifiedStreamElements:Thank you for following '
const lastLine = ' :) I appreciate the support.'
async function followBotExtractor() {
    return new Promise((resolve) => {
        fs.readFile("./followBotExtraction.txt", (err, data) => {
            if (err) {
                console.log(err)
                throw (err)
            }
            data = data.toString().split("\n").filter(line => !line.match(regex) && line !== '' && line.includes(firstLine))
            for (id in data) {
                data[id] = data[id].replace(firstLine, '')
                data[id] = data[id].replace(lastLine, '')
            }
            setBotList(data)
            resolve()
        })
    })

}
const setBotList = data => {
    fs.readFile('bots.json', 'utf8', function readFileCallback(err, _) {
        if (err) {
            console.log(err);
        } else {
            let obj = { "bots": [] }
            obj.bots.push(...data);
            json = JSON.stringify(obj);
            fs.writeFile('bots.json', json, 'utf8', (err) => {
                if (err) { console.log(err) }
                else {
                    console.log(`OkAy`)
                }
            })
        }
    })
}
module.exports = {
    followBotExtractor
}

// followBotExtractor()
