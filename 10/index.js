require('dotenv').config()
const axios = require('axios');

const group_id = process.env.GROUP_ID
const access_token = process.env.ACCESS_TOKEN
const api_version = process.env.VK_API_VERSION


var token = process.env.BOT_KEY
const VkBot = require('node-vk-bot-api');
const bot = new VkBot(token);


bot.on((ctx) => {
    var message = ctx.message.text
    if (message != '') {
        if (message.toLowerCase() == "звонок") {
            axios.get("https://api.vk.com/method/messages.startCall?access_token=" + access_token + "&v=" + api_version).then(response => {
                ctx.reply("ВЫ ХОТИТЕ ПОЗВОНИТЬ? НУ ЗВОНИТЕ, ВОТ ВАМ ССЫЛКА:\n" + response.data.response.join_link)
                
            }).catch(err => {
                console.error(err)
            })

            console.log()

        }
        else {
            ctx.reply("Для получения ссылки на звонок напишите \"Звонок\"")
        }
    }
});









bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});