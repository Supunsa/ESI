const express = require("express");
const router = express.Router();

const { getAll, getDate, downloadCSV } = require("../Controllers");

// GET home page.
router.get("/", getAll);
router.get("/get/:date/:endDate", getDate);
router.get("/get/download/:date/:endDate", downloadCSV);

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
