import {config} from '../app.js';
import mssql from "mssql";
export const homePage = (req, res) => {
    res.render('index');
}
export const countryPage = (req, res) => {
    res.render('country_page');
}
export const cafeinfo = (req, res) => {
    var cafe_name = req.body.cafe_name;
    cafe_name = cafe_name.replace(/'/gi,"\'");
    console.log(cafe_name);
    var sql1 = "select * from cafe_info where cafe_name = '"+ cafe_name+"'"; 
    var sql2 = "select * from cafe_info_drink where cafe_name = '"+ cafe_name+"'";
    var sql3 = "select * from cafe_info_meal where cafe_name = '"+ cafe_name+"'";
    mssql.connect(config,function (err) {
        if(err) console.log(err);
        console.log('MSSQL connected');
        var Request1 = new mssql.Request();
        var Request2 = new mssql.Request();
        var Request3 = new mssql.Request();
        var result1;
        var result2;
        var result3;
        Request1.query(sql1, (err, result) => {
            if(err){
                console.log(err);
            }
            result1 = JSON.parse(JSON.stringify(result.recordset[0]));
            console.log("result1 = ", result1);

            Request2.query(sql2, (err, result) => {
                if(err){
                    console.log(err);
                }
                result2 = JSON.parse(JSON.stringify(result.recordset));
                console.log("result2 = ", result2);

                Request3.query(sql3, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    result3 = JSON.parse(JSON.stringify(result.recordset));
                    console.log("result3 = ", result3);
                   res.render('cafe_info',{result1,result2,result3});
                }); 
            });
        });
        
       
       
    })
   
}
export const studypage = (req, res) => {
    var sql = "select * from study_page"; 
    mssql.connect(config,function (err) {
        if(err) console.log(err);
        console.log('MSSQL connected');
        var Request = new mssql.Request();
      Request.query(sql, (err, result) => {
            if(err){
                console.log(err);
            }
            var results = JSON.parse(JSON.stringify(result.recordset));
            console.log("results = ", results);
            res.render('study_page',{results});
        });
       
    })
 
}
export const chatpage = (req, res) => {
    var sql = "select * from chat_page"; 
    mssql.connect(config,function (err) {
        if(err) console.log(err);
        console.log('MSSQL connected');
        var Request = new mssql.Request();
      Request.query(sql, (err, result) => {
            if(err){
                console.log(err);
            }
            var results = JSON.parse(JSON.stringify(result.recordset));
            console.log("results = ", results);
            res.render('chat_page',{results});
        });
       
    })
  
}
export const countryResult = (req, res) => {
    var country_name = req.body.country;
    var sql = "select * from country_result where addr like '%"+country_name+"%'"; 
    mssql.connect(config,function (err) {
        if(err) console.log(err);
        console.log('MSSQL connected');
        var Request = new mssql.Request();
      Request.query(sql, (err, result) => {
            if(err){
                console.log(err);
            }
            var results = JSON.parse(JSON.stringify(result.recordset));
            console.log("results = ", results);
            res.render('country_result',{results,country_name});
        });
       
    })
  
}

