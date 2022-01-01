import express from "express";
import bodyParser from "body-parser";
import sql from "mssql";
import usersRoutes from "./routes/users.js";
import engine from 'ejs-locals';
import { Connection,Request } from "tedious";


const app = express();
const port = process.env.PORT||5000;


app.use(bodyParser.urlencoded({ extended: true }));



app.use(bodyParser.json());


app.use("/", usersRoutes);



app.use(express.static('public'));
app.use('/css', express.static('public/css'));


app.use('/img', express.static('public/img'))
app.use('/js', express.static('public/js'))

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');


///1234

//// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`));

// 123
// export var config={
//     user:'vivian',
//     password:'Apple0927399@',
//     server:'localhost\\SQLEXPRESS',   
//     database:'cafedB',
//     port: 1433,
//     trustServerCertificate: true,
// };

//export var db = new sql.Request();


export var db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'vivian0927399339@',
    database: 'cafedB'
})

//// Connect to MySQL
db.connect(err => {
    if(err){
        throw err;
    }
    console.log('MySQL connected');
})


