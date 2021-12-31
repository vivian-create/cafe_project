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
        var result=[];

        request1.on('prepared', ()=> { 
            result=[];
        });

        request1.on('row', function(columns) {  
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row);  
        });

        request1.on('requestCompleted', ()=> {  
            result1=JSON.parse(JSON.stringify(result[0]));
            console.log("result1 = ", result1);
            connection.execSql(request2); 
        });
        
        connection.execSql(request1);

        request2.on('prepared', () => { 
            result=[];
        });

        request2.on('row', function(columns) {  
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row);   
        });

        

        request2.on('requestCompleted', ()=> {  
            result2=JSON.parse(JSON.stringify(result));
            console.log("result2 = ", result2); 
            connection.execSql(request3);
        });
        
        

        request3.on('prepared', () => { 
            result=[];
        });

        request3.on('row', function(columns) {  
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row); 
        });

        request3.on('requestCompleted', ()=> {  
            result3=JSON.parse(JSON.stringify(result));
            console.log("result3 = ", result3); 
            res.render('cafe_info',{result1,result2,result3});
        });
        
        

    })

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

        var result=[];

        var request = new Request(sql,err => {
            if(err) console.log(err);
            console.log(sql);
        });

        request.on('row', function(columns) {
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row);  
        });

        request.on('requestCompleted',()=>{
            
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results);
            res.render('study_page',{results});
        })
        connection.execSql(request);

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

        var result=[];


        var request = new Request(sql,err => {
            if(err) console.log(err);
        });

        request.on('row', function(columns) {  
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row);  
        });

        request.on('requestCompleted',()=>{  
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results);
            res.render('chat_page',{results}); 
        });

        connection.execSql(request);
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

        var result=[];
        var i=0;

        var request = new Request(sql,err => {
            if(err) console.log(err);
        });

        request.on('row', function(columns) {  
            var row={};  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  row[column.metadata.colName]=column.value;
                }  
              });
            result.push(row);   
        });

        request.on('requestCompleted',()=>{  
            results=JSON.parse(JSON.stringify(result));
            console.log("results = ", results); 
            res.render('country_result',{results,country_name});
        });

        connection.execSql(request);
    });
    connection.connect();
    connection.close();
}

