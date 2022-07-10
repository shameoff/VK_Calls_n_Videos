require('dotenv').config()
const axios = require('axios');
const fs = require('fs')


const access_token = process.env.ACCESS_TOKEN
const api_version = process.env.VK_API_VERSION


const owner_id = process.env.OWNER_ID

function create_trailer(owner_id) {
    const req_url = `https://api.vk.com/method/video.get?access_token=${access_token}&v=${api_version}&&owner_id=${owner_id}\n`
    console.log(`API URL: ${req_url}`)
    fs.writeFileSync("video_data", "")
    axios.get(req_url).then(response => {
        // console.log(response.data.response)
        response.data.response.items.forEach(item => {
            var title = item.title
            var image_max_width = { "width": -1 }
            item.image.forEach((item) => {
                if (item.width >= image_max_width.width) {
                    image_max_width = item
                }
            })
            // console.log({"title":title, "url": image_max_width.url, "views" : item.views});
            fs.appendFile("video_data", JSON.stringify({ "title": title, "url": image_max_width.url, "views": item.views }) + "\n", function (error) {
                if (error) throw error; // если возникла ошибка

                console.log("Запись файла завершена. Содержимое файла:");
                let data = fs.readFileSync("video_data", "utf8");
                console.log(data);  // выводим считанные данные
            })

        })
    });
}


create_trailer(owner_id)