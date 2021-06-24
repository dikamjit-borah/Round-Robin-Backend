const mysql = require("mysql")

const db = mysql.createConnection({

    host:"freedb.tech",
    user:"freedbtech_RR",
    password:"password",
    database:"freedbtech_roundrobindb",
    timezone: 'Z'

})

module.exports = db