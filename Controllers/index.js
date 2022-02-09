const mysql = require("mysql");
var fileSystem = require("fs");
var fastcsv = require("fast-csv");

exports.getAll = (req, res) => {
  var data = [];
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database",
  }); // เชื่อมต่อฐานข้อมูล

  con.connect(function (err) {
    // เชื่อมต่อ Database
    if (err) throw err; // ถ้าเกิด Error ให้โยนค่าที่แจ้งออกมา
    con.query("SELECT * FROM dbo_configs ", function (err, result) {
      // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
      if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error

      con.query(
        "SELECT * FROM dbo_raws ORDER BY dbo_raws.Id DESC limit 1 ",
        function (err, value) {
          // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
          if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error

          if (value[0].data1 == null) data.push("Null");
          else data.push(value[0].data1);

          if (value[0].data2 == null) data.push("Null");
          else data.push(value[0].data2);

          if (value[0].data3 == null) data.push("Null");
          else data.push(value[0].data3);

          if (value[0].data4 == null) data.push("Null");
          else data.push(value[0].data4);

          if (value[0].data5 == null) data.push("Null");
          else data.push(value[0].data5);

          if (value[0].data6 == null) data.push("Null");
          else data.push(value[0].data6);

          if (value[0].data7 == null) data.push("Null");
          else data.push(value[0].data7);

          if (value[0].data8 == null) data.push("Null");
          else data.push(value[0].data8);

          if (value[0].data9 == null) data.push("Null");
          else data.push(value[0].data9);

          if (value[0].data10 == null) data.push("Null");
          else data.push(value[0].data10);

          if (value[0].data11 == null) data.push("Null");
          else data.push(value[0].data11);

          if (value[0].data12 == null) data.push("Null");
          else data.push(value[0].data12);

          if (value[0].data13 == null) data.push("Null");
          else data.push(value[0].data13);

          if (value[0].data14 == null) data.push("Null");
          else data.push(value[0].data14);

          if (value[0].data15 == null) data.push("Null");
          else data.push(value[0].data15);

          if (value[0].data16 == null) data.push("Null");
          else data.push(value[0].data16);

          // console.log(data);

          return res.render("index", { result, data, value: value[0] });
        }
      );
    });
  });
};

exports.getDate = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database",
  }); // เชื่อมต่อฐานข้อมูล

  var Startday = req.params.date;
  var Endday = req.params.endDate;

  con.connect(function (err) {
    // เชื่อมต่อ Database
    if (err) throw err; // ถ้าเกิด Error ให้โยนค่าที่แจ้งออกมา
    con.query(
      `SELECT * FROM dbo_raws WHERE datetime BETWEEN '${Startday}' AND '${Endday}'`,
      function (err, result) {
        // สั่งให้ไปเลือก table datalogs โดยดึงจาก id *** desc ไม่มั่นใจว่าเรียงจากล่าสุด ***
        if (err) throw err; // ถ้าไม่สามารถดึงข้อมูลมาจากที่เลือกได้ แจ้ง Error

        // console.log(result);

        con.end();
        return res.render("getData", {
          datas: result,
          start: Startday,
          end: Endday,
        });
      }
    );
  });
};

exports.downloadCSV = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database",
  }); // เชื่อมต่อฐานข้อมูล

  var Startday = req.params.date;
  var Endday = req.params.endDate;

  con.connect(function (err) {
    // เชื่อมต่อ Database
    if (err) throw err;
    con.query(
      `SELECT * FROM dbo_raws WHERE datetime BETWEEN '${Startday}' AND '${Endday}'`,
      function (err, result) {
        if (err) throw err;

        con.end();

        const jsonData = JSON.parse(JSON.stringify(result));

        var ws = fileSystem.createWriteStream("public/data.csv");
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function () {
            res.send(
              `<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click(); window.location.href = 'http://localhost:8000/get/${Startday}/${Endday}';</script>`
            );
          })
          .pipe(ws);
      }
    );
  });
};
