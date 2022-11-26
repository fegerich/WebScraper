const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const {response} = require("express")
const PORT  = 8000

const app = express()

const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(response => {
        const html = response.data
        console.log(html)
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__header', html).each(function(){
            const text = $(this).text()
            const url = $(this).find('a').attributes('href')
            articles.push({
                text,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))