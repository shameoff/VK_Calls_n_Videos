require('dotenv').config()
const axios = require('axios');

const owner_id = process.env.OWNER_ID
const access_token = process.env.ACCESS_TOKEN
const api_version = process.env.VK_API_VERSION
const regex = new RegExp(process.env.REGEX)
const video_id = process.env.VIDEO_ID
const video_count = process.env.VIDEO_COUNT
console.log(regex);

function count_comments(owner_id, video_id, regex) {
    const req_url = `https://api.vk.com/method/video.getComments?access_token=${access_token}&v=${api_version}&video_id=${video_id}&owner_id=${owner_id}&count=${video_count}\n`
    console.log(`API URL: ${req_url}`)

    var counter = 0
    axios.get(req_url).then(response => {
        // console.log(response.data.response)
        response.data.response.items.forEach(item => {
            console.log(item.text + "\n");
            if (regex.test(item.text)) {
                counter += 1
            }
        })
        console.log(`Диапазон поиска: ${video_count}. \nМаска, по которой искать ${regex} \nКомментариев найдено: ${counter}`)
    });
}

count_comments(owner_id, video_id, regex)

