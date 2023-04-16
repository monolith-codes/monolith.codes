const express =  require('express');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: CHANGE_HOST,
    port: CHANGE_PORT,
    user: CHANGE_USERNAME,
    password: CHANGE_PASSWORD,
    database: CHANGE_DBNAME
});


const app = express();

app.use(cors());

let database_connected = false;

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MariaDB:', err);
      database_connected = false;

      return;
    }else {
        console.log('Connected to MariaDB!');
        database_connected = true;
    }
});


app.get('/', (req, res) => {
    if (database_connected == false){
        res.send('DATABASE CONNECTION FAILED');
    }else {

        connection.query("SELECT user_email FROM contact_users WHERE user_id = ?", [1], function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            let results1 =JSON.parse(JSON.stringify(result))
            res.json({ user_email: results1[0].user_email })
        });
    }
});

app.listen(3000, () => {
    console.log('My REST API running on port 3000!');
})