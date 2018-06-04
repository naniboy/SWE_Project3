var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connictionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: '940306'
});



router.get('/', function(req,res, next){

  res.redirect('/board/index');
});


/* GET home page. */

router.get('/index', function(req, res, next) {
  pool.getConnection(function(err, connection){
 
   connection.query('SELECT * From board', function(err,rows){
     if(err) console.error("err: "+err);
     console.log("rows : "+ JSON.stringify(rows));
 
     res.render('index', { title: 'test',rows: rows });
     connection.release();
 
   });
  });
  
 });
// 물품 구매 페이지
// router.get('/tshirt/:page',function(req,res,next){

//   pool.getConnection(function (err,connection){
// //use the connection

// var sqlForSelectList="SELECT * FROM board";
// connection.query(sqlForSelectList,function(err, rows){

// if (err) console.error("err : "+ err);
// console.log("rows: "+JSON.stringify(rows));

// res.render('/tshirt',{title:'tshirt', rows: rows});
// connection.release();

// });

//   });

// });

router.get('/tshirt',function(req,res,next){
  pool.getConnection(function(err, connection){
 
    connection.query('SELECT * From board', function(err,rows){
      if(err) console.error("err: "+err);
      console.log("rows : "+ JSON.stringify(rows));
  
      res.render('tshirt', { title: 'test',rows: rows });
      connection.release();
  
    });
   });
  });

  router.get('/tshirt_menu',function(req,res,next){
    pool.getConnection(function(err, connection){
   
      connection.query('SELECT * From board', function(err,rows){
        if(err) console.error("err: "+err);
        console.log("rows : "+ JSON.stringify(rows));
    
        res.render('tshirt_menu', { title: 'test',rows: rows });
        connection.release();
    
      });
     });
    });
module.exports = router;
