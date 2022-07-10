import json
import ffmpeg
import requests
import os

import cv2

jsons = []
with open("video_data", mode='r', encoding='utf-8') as file:
    jsons = file.read().split("\n")
    jsons = jsons[:-1]
for i in range(len(jsons)):
    jsons[i] = json.loads(jsons[i])

data = sorted(jsons, key=lambda x: -x["views"])


def load_image(name, url):
    p = requests.get(url)
    out = open(f"./pixs/{name}.jpg", "wb")
    out.write(p.content)
    out.close()


def load_images():
    for pix in data:
        print("Picture", pix["title"], "is loading")
        load_image(pix["title"], pix["url"])
        print("Picture", pix["title"], "loaded")
        print()


def make_video():
    image_folder = 'pixs'
    video_name = 'video.avi'

    images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]
    frame = cv2.imread(os.path.join(image_folder, images[0]))
    height, width, layers = frame.shape

    video = cv2.VideoWriter(video_name, 0, 0.2, (width, height))

    for obj in data:
        image = obj["title"]
        img = cv2.imread(os.path.join(image_folder, f"{image}.jpg"))
        color_yellow = (120, 180, 255)

        value = 3.7
        if len(image) > 50:
            cv2.putText(img, image[:50], (20, 600), cv2.FONT_HERSHEY_COMPLEX, int(value), color_yellow, int(value))
            cv2.putText(img, image[50:], (20, 700), cv2.FONT_HERSHEY_COMPLEX, int(value), color_yellow, int(value))
        else:
            cv2.putText(img, image, (20, 600), cv2.FONT_HERSHEY_COMPLEX, int(value), color_yellow, int(value))


        video.write(img)

    cv2.destroyAllWindows()
    video.release()

    
load_images()
make_video()
