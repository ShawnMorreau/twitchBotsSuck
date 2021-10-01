// const fs = require("fs")

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  sleep
};

// const updateNewList = (bot) => {
//     fs.readFile('bots.json', 'utf8', function readFileCallback(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             obj = JSON.parse(data);
//             obj.bots.push(bot); //add some data
//             json = JSON.stringify(obj); //convert it back to json
//             fs.writeFile('bots.json', json, 'utf8', (err) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(`added ${bot} to the list`)
//                 }
//             })
//         }
//     })
// }
