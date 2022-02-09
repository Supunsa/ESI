var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//เรียกใช้ libraly ทั้งหมด

var indexRouter = require("./routes/index"); // import ไฟล์จาก folder ที่เรากำหนด
var historyRouter = require("./routes/history"); // import ไฟล์จาก folder ที่เรากำหนด

const app = express(); // สร้างตำแปร app เก็บ express ฟังก์ชัน

// view engine setup
app.set("views", path.join(__dirname, "views")); // สั่งเซ็ทตัวแสดงผลจาก Folder views
app.set("view engine", "ejs");

// console.log(path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + "/public"));
app.use(logger("dev")); // แจ้งผลใน terminal
app.use(express.json()); // รับข้อมูลแบบ json
app.use(express.urlencoded({ extended: false })); // ไม่เข้ารหัส url
app.use(cookieParser()); // ใช้ตัวจัดการ cookie
app.use(express.static(path.join(__dirname, "public"))); // ใช้ static ไฟล์ พวก css js จากโฟลเดอร์ public

app.use("/", indexRouter); // สร้าง path / แล้วตามด้วย path ต่างๆที่เราสร้าง
app.use("/history", historyRouter); // สร้าง path / แล้วตามด้วย path ต่างๆที่เราสร้าง

app.listen(8000, () => {
  // สั่งรันเซิฟเวอร์
  console.log("Server Started");
});

module.exports = app;
