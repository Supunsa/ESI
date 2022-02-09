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
    
    // var Startday = await moment(Startdate, 'YYYY-MM-DDThh:mm:ss A').format("DD/MMM/YYYY,hh:mm:ss A")
    // var Endday = await moment(Enddate, 'YYYY-MM-DDThh:mm:ss A').format("DD/MMM/YYYY,hh:mm:ss A")

    var Startday = await moment(Startdate, 'YYYY-MM-DDThh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss')
    var Endday = await moment(Enddate, 'YYYY-MM-DDThh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss')

    // if(Startday.charAt(11) === '0') Startday = Startday.substring(0,10) + " " + Startday.substring(12)
    
    // if(Endday.charAt(11) === '0') Endday = Endday.substring(0,10) + " " + Endday.substring(12)

    // Startday = Startday.replaceAll("/", "-")
    // Endday = Endday.replaceAll("/", "-")

    // console.log(Startday, Endday);
    res.redirect(`/get/${Startday}/${Endday}`)
})

module.exports = router;