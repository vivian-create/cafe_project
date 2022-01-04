import {pool} from '../app.js';
import mssql from "mssql";
import mysql from "mysql";
import { Connection,Request } from "tedious";
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

    var result1={};
    var result2={};
    var result3={};
    pool.getConnection((err,db)=>{
      if(err) throw err;
      db.query(sql1,(err,result)=>{
          if(err) throw err;
          result1=JSON.parse(JSON.stringify(result[0]));
            if(result[0].img != null)
              result1.img = Buffer.from(result[0].img,'binary').toString('base64').toString('utf8')
          console.log('result1 = ',result1);
          db.query(sql2,(err,result)=>{
            if(err) throw err;
            result2=JSON.parse(JSON.stringify(result));
            console.log('result2 = ',result2);

            db.query(sql3,(err,result)=>{
              if(err) throw err;
              result3=JSON.parse(JSON.stringify(result));
              console.log('result3 = ',result3);
              res.render('cafe_info',{result1,result2,result3});
            });
          });
      });
    });
}
export const studypage = (req, res) => {
    var sql = "select * from study_page where img <> 0x00"; 
    
    var results={};

    pool.getConnection((err,db)=>{
      if(err) throw err;
      db.query(sql,(err,result)=>{
        if(err) throw err;
        results=JSON.parse(JSON.stringify(result));
        for(let i =0; i<results.length;i++){
          results[i].img = Buffer.from(result[i].img,'binary').toString('base64').toString('utf8');
        }
        console.log('result = ',results);

        res.render('study_page',{results});
      });
    });
}

export const chatpage = (req, res) => {
    var sql = "select * from chat_page where img <> 0x00"; 
    var results={};
    pool.getConnection((err,db)=>{
      if(err) throw err;
      db.query(sql,(err,result)=>{
        if(err) throw err;
        results=JSON.parse(JSON.stringify(result));
        for(let i =0; i<results.length;i++){
          results[i].img = Buffer.from(result[i].img,'binary').toString('base64').toString('utf8');
        }
        console.log('result = ',results);

        res.render('chat_page',{results});
      });
    });
}

export const countryResult = (req, res) => {
    var country_name = req.body.country;
    var sql = "select * from country_result where addr like '%"+country_name+"%' and img <> 0x00"; 
    var results;
    pool.getConnection((err,db)=>{
      if(err) throw err;
      db.query(sql,(err,result)=>{
        if(err) throw err;
        results=JSON.parse(JSON.stringify(result));
        for(let i =0; i<results.length;i++){
          results[i].img = Buffer.from(result[i].img,'binary').toString('base64').toString('utf8');
        }
        console.log('result = ',results);
        
        res.render('country_result',{results,country_name});
      });
    });   
        
}

