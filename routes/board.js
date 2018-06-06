var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connictionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'als213546'
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

router.get('/tshirt_menu/:item_name',function(req,res,next){

  var item_name=req.params.item_name;

  pool.getConnection(function(err, connection){
 

     var sql="select idx,item_name,item_type,price,color,spec from product where item_name=? ";
 // list js 만들 떄 사용하는건데 이렇게 해도 되는건가.
    connection.query(sql,[item_name], function(err,rows){
      if(err) console.error("err: "+err);
      console.log("rows : ",rows);
  
      res.render('tshirt', { title: 'test',rows: rows });//여기에 함부로 추가면 좇된다. 이대로 형식을 둡니다. 

      connection.release();
  
    });
   });
  });

router.get('/tshirt_menu',function(req,res,next){
    pool.getConnection(function(err, connection){
   
      connection.query('SELECT idx,item_name,item_type,price,color,spec From product', function(err,rows){
        if(err) console.error("err: "+err);
        console.log("rows : "+ JSON.stringify(rows));
    
        res.render('tshirt_menu', { title: 'test',rows: rows });
        connection.release();
    
      });
     });
});


router.get('/login',function(req,res,next){
      res.render('login');
});




router.get('/register',(req,res,next)=>{
  res.render('register');
});

router.post('/register',function(req,res,next){
  console.log('req.body: '+JSON.stringify(req.body));
  var sql ;
  
  pool.getConnection(function(err,connection){
    connection.query(sql,function(err,rows){
      res.redirect('login');
      connection.release();
    });
  });

});


module.exports = router;
