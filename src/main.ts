import { Configuration, OpenAIApi } from "openai";
const fs = require('fs')
import axios from 'axios'
require('dotenv').config({ path: '../.env'})

const conf = new Configuration({
    apiKey: '',
})

const genImg = async (pedido: string) => {
    
    const openai = new OpenAIApi(conf);
    const res = await openai.createImage({
        prompt: pedido,
        n: 4, // n° de img
        size: '1024x1024'
    })
    let image_url = res.data.data[0].url
    
    console.log(image_url)
    const imagem = await download_image(image_url)
    const buffer = Buffer.from(imagem, "base64");
    fs.writeFileSync(`./storage/${pedido}.jpg`, buffer)
}

const download_image = (url: any) => {

    fs.mkdir('./storage', function(e: any){
        if(!e || (e && e.code === 'EEXIST')){
            //do something with contents
        } else {
            //debug
            console.log(e);
        }
    });

    return axios.get(url, {
        responseType: 'arraybuffer'
    }).then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

genImg('t-rex driving a school bus')