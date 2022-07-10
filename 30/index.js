require('dotenv').config()
const axios = require('axios');

const group_id = process.env.GROUP_ID
const access_token = process.env.ACCESS_TOKEN
const api_version = process.env.VK_API_VERSION
const req_url = `https://api.vk.com/method/video.get?access_token=${access_token}&v=${api_version}&owner_id=${group_id}\n`
console.log(req_url)

var videos = new Set()

function check_translations() {
    axios.get(req_url).then(response => {
        response.data.response.items.forEach(item  => {
            if (item.type == 'live' && !(videos.has(item.id))){
                console.log(`TITILE: ${item.title}\nDESCRIPTION:\n${item.description}\n`)
                videos = videos.add(item.id)
            }
        })
    });
}

var timerId = setInterval(check_translations, 6000)

