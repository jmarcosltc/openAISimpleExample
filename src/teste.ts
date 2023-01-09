import { Configuration, OpenAIApi } from "openai";
const fs = require('fs')
import axios from 'axios'

const conf = new Configuration({
    apiKey: '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'
})

const genImg = async (pedido: string) => {
    
    const openai = new OpenAIApi(conf);
    const res = await openai.createImage({
        prompt: pedido,
        n: 1, // n° de img
        size: '1024x1024'
    })
    let image_url = res.data.data[0].url
    
    const imagem = await download_image(image_url)
    const buffer = Buffer.from(imagem, "base64");
    fs.writeFileSync(`./storage/${pedido}.jpg`, buffer)
}

const download_image = (url: any) => {
    return axios.get(url, {
        responseType: 'arraybuffer'
    }).then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

genImg('manuel gomes')