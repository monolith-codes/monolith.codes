const express =  require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: CHANGE_HOSTNAME,
    port: CHANGE_PORT,
    user: CHANGE_USER,
    password: CHANGE_PASSWORD,
    database: CHANGE_DBNAME
});


const app = express();

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
        res.send('DATABASE CONNECTION ESTABLISHED');
    }
});

app.listen(3000, () => {
    console.log('My REST API running on port 3000!');
})