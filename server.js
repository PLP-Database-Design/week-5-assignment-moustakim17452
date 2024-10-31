// Install some dependencies/packages
const express = require('express')
const app = express();
const mysql = require('mysql2')
const cors = require('cors')
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Check for connections
db.connect((err) => {
  if(err) return console.log("Error connecting to Mysql");
  console.log("Connected to Mysql as id: ", db.threadId);
})


// Get Method
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/data', (req,res) =>{

    db.query('SELECT * FROM patients', (err,result) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error Retriving data')
        }  else{
            res.render('data', {results:results});
        }
    });

    db.query('SELECT * FROM providers', (err,result) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error Retriving data')
        }  else{
            res.render('data', {results:results});
        }
    });
        db.query('SELECT * FROM patients WHERE first_name = ?', (err,result) =>{
            if(err){
                console.error(err);
                res.status(500).send('Error Retriving data')
            }  else{
                res.render('data', {results:results});
            }    
        });

        db.query('SELECT * FROM providers WHERE provider_specialty = ?', (err,result) =>{
            if(err){
                console.error(err);
                res.status(500).send('Error Retriving data')
            }  else{
                res.render('data', {results:results});
            }    
        });
});

// Start the server
app.listen(process.env.PORT, () =>{
    console.log(`Server listening on port ${process.env.PORT}`);

    console.log('sending message to the browser....')
    app.get('/', (req,res) =>{
    res.send('YEY!!! The server started successfully!!!');
    });
});


