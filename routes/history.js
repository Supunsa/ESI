const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const mysql = require('mysql');
const moment = require("moment")


router.get('/get', (req, res) => {
    return res.render('history')
});

router.post("/post", async (req, res) => {
    const { Startdate, Enddate} = req.body
    // console.log(Startdate);
    console.log(req.body);
    
    var Startday = await moment(Startdate, 'YYYY-MM-DDThh:mm:ss A').format("DD/MMM/YYYY,hh:mm:ss A")
    var Endday = await moment(Enddate, 'YYYY-MM-DDThh:mm:ss A').format("DD/MMM/YYYY,hh:mm:ss A")

    // var startTime = moment(Starttime, ["hh:mm:ss A"]).format("hh:mm:ss A");
    // var endTime = moment(Endtime, ["hh:mm:ss A"]).format("hh:mm:ss A");
    // console.log(startTime);

    if(Startday.charAt(12) === '0') Startday = Startday.substring(0,12) + Startday.substring(13)
    
    if(Endday.charAt(12) === '0') Endday = Endday.substring(0,12) + Endday.substring(13)

    Startday = Startday.replaceAll("/", "-")
    Endday = Endday.replaceAll("/", "-")

    // console.log(Startday, Endday);
    res.redirect(`/get/${Startday}/${Endday}`)
})

module.exports = router;