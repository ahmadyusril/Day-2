const express = require("express");
const request = require('express/lib/request');
const response = require('express/lib/response');
const app = express();
const path = require("path");

const getDuration = require("./js/getDuration");
const getFullTime = require("./js/getFullTime");
const getDistance = require("./js/getDistance");

const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views/'));

app.use('/image', express.static('image'))
app.use('/js', express.static('js'))
app.use(express.urlencoded({ extended: false }));

let dummyData = [
    {
        id:0,
        title:"Dumbways Mobile App - 2023",
        postedAt:"27 Aug 2023 15:00 WIB",
        startDate:"2023-08-27",
        fullTimeStartDate:"27 Aug 2023",
        endDate:"2023-11-27",
        fullTimeEndDate:"27 Nov 2023",
        duration:"3 Bulan",
        content:"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
        technologies:["node","react"],
        timeAfterPosted:""
    },
    {
        id:1,
        title:"Dumbways Mobile App - 2023",
        postedAt:"27 Aug 2023 15:00 WIB",
        startDate:"2023-08-27",
        fullTimeStartDate:"27 Aug 2023",
        endDate:"2023-11-27",
        fullTimeEndDate:"27 Nov 2023",
        duration:"3 Bulan",
        content:"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
        technologies:["node"],
        timeAfterPosted:""
    },
    {
        id:2,
        title:"Dumbways Mobile App - 2023",
        postedAt:"27 Aug 2023 15:00 WIB",
        startDate:"2023-08-27",
        fullTimeStartDate:"27 Aug 2023",
        endDate:"2023-11-27",
        fullTimeEndDate:"27 Nov 2023",
        duration:"3 Bulan",
        content:"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
        technologies:["react"],
        timeAfterPosted:""
    },
]

app.get("/", async (request, response) => {
    await getTimeAfterPosted(dummyData);
    await response.render('index', {blogs : dummyData})
})


app.get("/contact", (request, response) => {
    response.render('contact')
})

app.get("/blog", (request, response) => {
response.render('blog')
})
app.post("/blog", function (request, response) {
    const {title, content, startDate, endDate, technologies} = request.body;
    const duration = getDuration(new Date(startDate), new Date(endDate));
    const postedAt = getFullTime(new Date());
    const fullTimeStartDate = getFullTime(new Date(startDate));
    const fullTimeEndDate = getFullTime(new Date(endDate));
    const blog = {
        id: dummyData.length,
        title,
        postedAt,
        startDate,
        fullTimeStartDate,
        endDate,
        fullTimeEndDate,
        duration,
        content,
        technologies,
        timeAfterPosted: "0 second ago",
    }
    console.log(blog);
    dummyData.push(blog);
    response.redirect("/");
})

app.get("/blog-content/:id", function (request, response) {
    let id = request.params.id;
    response.render("blog-content", {data: dummyData.find((item) => item.id == id)});
})

app.get("/delete-blog/:id", function (request, response) {
    let id = request.params.id;
    const result = dummyData.filter((item) => item.id != id);
    result.sort((a,b) => {
        return a.id - b.id;
    })
    console.log(result);
    dummyData = result;

    response.redirect("/");
})

function getTimeAfterPosted(data) {
    for (let i = 0 ; i < data.length ; i++) {
        const postedAt = data[i].postedAt.replace("WIB", "");
        data[i].timeAfterPosted = getDistance(postedAt);
    }
    return;
}

const port = 5000
app.listen(port, function () {
    console.log(`server running on port : ${port}`);
})