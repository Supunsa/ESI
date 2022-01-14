var mysql = require('mysql');
const { options } = require('./routes');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // const dte = new Date();
  // const dateString = (("0" + dte.getDate()).slice(-2)) + "/" + monthNames[dte.getMonth()] + "/" + (dte.getFullYear()) + "," + (dte.toLocaleTimeString())

  setInterval(() => {
    const dte = new Date();
    const dateString = (("0" + dte.getDate()).slice(-2)) + "/" + monthNames[dte.getMonth()] + "/" + (dte.getFullYear()) + ", " + (dte.toLocaleTimeString())
    // var sql = `INSERT INTO datalogs (Site, Date, Channel, Units, Raw, Instant, Status1, Min1, Status2, Min5, Status3, Min10, Status4, Min60, Status5) VALUES ('TEST', '${dateString}','CO','PPM','2.2','2.2','OK','0.6','OK','0.6','OK','0.5','OK','0.5','OK')`;
    var sql = `INSERT INTO dbo_raw (Date) VALUES ('${dateString}')`;
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Insert Data Success");
    // console.log(Channel);
  });
  }, 30000)
});