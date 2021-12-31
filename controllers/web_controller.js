import {config} from '../app.js';
import mssql from "mssql";
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
    var connection = new Connection(config);
    connection.on('connect',err => {
        if(err) console.log(err);
        console.log('MSSQL connected');
        var request1 = new Request(sql1,err => {
            if(err) console.log(err);
        });
        var request2 = new Request(sql2,err => {
            if(err) console.log(err);
        });
        var request3 = new Request(sql3,err => {
            if(err) console.log(err);
        });
        var result={};
        
        var i=0;

        request1.on('prepared', ()=> { 
            result={};
            i=0;
        });

        request1.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request1.on('done', function(rowCount, more) {  
            result1=JSON.parse(JSON.stringify(result[0]));
            console.log("result1 = ", result1); 
        });
        
        connection.execSql(request1);

        Request2.on('prepared', () => { 
            result={};
            i=0;
        });

        request2.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request2.on('done', function(rowCount, more) {  
            result2=JSON.parse(JSON.stringify(result));
            console.log("result2 = ", result2); 
        });
        
        connection.execSql(request2);

        request3.on('prepared', () => { 
            result={};
            i=0;
        });

        request3.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request3.on('done', function(rowCount, more) {  
            result3=JSON.parse(JSON.stringify(result));
            console.log("result3 = ", result3); 
        });
        
        connection.execSql(request3);

    })

    connection.on('end',()=>{
        res.render('cafe_info',{result1,result2,result3});
    });
    connection.connect();
    connection.close();
}
export const studypage = (req, res) => {
    var sql = "select * from study_page"; 
    var connection = new Connection(config);
    var results={};
    connection.on('connect',err => {
        if(err) console.log(err);
        console.log('MSSQL connected');

        var result={};
        var i=0;

        var request = new Request(sql,err => {
            if(err) console.log(err);
        });

        request.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request.on('done', function(rowCount, more) {  
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results); 
        });

        connection.execSql(request);
    });
    connection.on('end',()=>{
        res.render('study_page',{results});
    });
    connection.connect();
    connection.close();
}
export const chatpage = (req, res) => {
    var sql = "select * from chat_page"; 
    var results={};
    connection.on('connect',err => {
        if(err) console.log(err);
        console.log('MSSQL connected');

        var result={};
        var i=0;

        var request = new Request(sql,err => {
            if(err) console.log(err);
        });

        request.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request.on('done', function(rowCount, more) {  
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results); 
        });

        connection.execSql(request);
    });

    connection.on('end',()=>{
        res.render('chat_page',{results});
    });
    connection.connect();
    connection.close();
}
export const countryResult = (req, res) => {
    var country_name = req.body.country;
    var sql = "select * from country_result where addr like '%"+country_name+"%'"; 
    var results;
    connection.on('connect',err => {
        if(err) console.log(err);
        console.log('MSSQL connected');

        var result={};
        var i=0;

        var request = new Request(sql,err => {
            if(err) console.log(err);
        });

        request.on('row', function(columns) {  
            result[i]={};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result[i][column.metadata.colName]=column.value;
              }  
            });
            i++;  
        });

        request.on('done', function(rowCount, more) {  
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results); 
        });

        connection.execSql(request);
    });
    connection.on('end',()=>{
        res.render('country_result',{results,country_name});
    });
    connection.connect();
    connection.close();
}

