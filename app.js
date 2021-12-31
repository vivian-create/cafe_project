import express from "express";
import bodyParser from "body-parser";
import sql from "mssql";
import usersRoutes from "./routes/users.js";
import engine from 'ejs-locals';

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
// var config = {  
//     server: '140.136.151.128',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'vivian',
//             password: 'Apple0927399339'
//         }
//     },
//     options: {
//         database: 'cafedB',
//         port: 1433  //your port number
//     }
// }; 
// 123
export var config={
    user:'Apple',
    password:'idiotjelly890528@',
    server:'cafe0927399.database.windows.net',   
    database:'cafedB',
    port: 1433,
    trustServerCertificate: true,
};

//export var db = new sql.Request();
sql.connect(config,function (err) {
    if(err) console.log(err);
    console.log('MSSQL connected');
   
})
