const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const mysql = require('mysql');

// GET home page.
router.get('/', function (req, res) {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
  }); // เชื่อมต่อฐานข้อมูล

  con.connect(function (err) { // เชื่อมต่อ Database
    if (err) throw err; // ถ้าเกิด Error ให้โยนค่าที่แจ้งออกมา
    con.query("SELECT * FROM dbo_config JOIN dbo_raw ORDER BY dbo_raw.Id DESC limit 3 ", function (err, result) { // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
      if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error

        return res.render('index', { result});
    });
  });
});

router.get('/get/:date/:endDate', function (req, res) {
  var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'database'
  }); // เชื่อมต่อฐานข้อมูล

  var Startday = req.params.date;
  var Endday = req.params.endDate;
  // var Starttime = req.params.startTime;
  // var Endtime = req.params.endTime;

  console.log(Startday, Endday);

  // console.log(Startday);
  var day = Startday.replaceAll('-', '/');
  var Endday = Endday.replaceAll('-', '/');

  con.connect(function (err) { // เชื่อมต่อ Database
    if (err) throw err; // ถ้าเกิด Error ให้โยนค่าที่แจ้งออกมา
    con.query(`SELECT * FROM datalogs WHERE Date BETWEEN '${day}' AND '${Endday}'`, function (err, result, fields) { // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
      if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error
    con.end()
      return res.render('getData', { datas: result, start: Startday, end: Endday }); // สั่งให้ไปประมวลผลไฟล์ index.ejs แล้วส่งค่าที่ได้จากการดึงไปด้วย
    });
  });
  

});

// router.get('/get/:startTime/:endTime', function (req, res) {
//   var con = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'database'
//   }); // เชื่อมต่อฐานข้อมูล

//   var startTime = req.params.startTime;
//   var endTime = req.params.endTime;

//   con.connect(function (err) { // เชื่อมต่อ Database
//     if (err) throw err; // ถ้าเกิด Error ให้โยนค่าที่แจ้งออกมา
//     con.query(`SELECT * FROM datalogs WHERE Time BETWEEN '${startTime}' AND '${endTime}'`, function (err, result, fields) { // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
//       if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error
//     con.end()
//       return res.render('index', { datas: result }); // สั่งให้ไปประมวลผลไฟล์ index.ejs แล้วส่งค่าที่ได้จากการดึงไปด้วย
//     });
//   });

// });

module.exports = router;