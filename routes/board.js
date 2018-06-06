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

router.get('/sell/:item_name', function(req, res, next) {
  var item_name = req.params.item_name;
  console.log("????" + item_name);
  pool.getConnection(function(err, connection){
    var sql = 'UPDATE product SET sell = sell + 1 WHERE item_name = ?'
    connection.query(sql, [item_name], function(err,rows){
      if(err) console.error("err: "+err);
  
      //res.render('index', { title: 'test',rows: rows });
      connection.release();
  
    });
  });
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


 router.get('/tshirt_menu/:item_name',function(req,res,next){

  var item_name=req.params.item_name;

  pool.getConnection(function(err, connection){
    var sql1="select idx,item_name,item_type,price,color,spec from product where item_name=? ";
    var sql2 = "select * from review where item_name=?"
    var prod_info=[];
    var prod_rev=[];
// list js 만들 떄 사용하는건데 이렇게 해도 되는건가.
    connection.query(sql1, item_name, function(err,rows){
      if(err) console.error("err: "+err);
      prod_info=rows;
      console.log("info : ",prod_info);
    });

    connection.query(sql2, item_name, function(err,rows){
      if(err) console.error("err: "+err);
      prod_rev=rows;
      console.log("rev : ",prod_rev);
      
      res.render('tshirt', { title: 'test', rows: prod_info, db: prod_rev });//여기에 함부로 추가면 좇된다. 이대로 형식을 둡니다. 

      connection.release();
    });

   });  
});
router.get('/buy/:item_name',function(req,res,next){

  var item_name = req.params.item_name;
  var select_size = req.query.select_size;

  pool.getConnection(function(err, connection){
 
     var sql="select item_name,item_type,price,color,spec from product where item_name=? ";
// list js 만들 떄 사용하는건데 이렇게 해도 되는건가.

    connection.query(sql,[item_name], function(err,rows){
      if(err) console.error("err: "+err);
      
  
      res.render('buy', { title: 'test',rows: rows, select_size: select_size });//여기에 함부로 추가면 좇된다. 이대로 형식을 둡니다. 

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
  var id = req.body.id;
  var pw = req.body.passwd;
  var email = req.body.email;
  var name = req.body.name;
  var addr = req.body.address;
  var phone = req.body.tel;
  var gend = req.body.gender;
  var birth = req.body.birth;
  var data = [id,pw,email,name,addr,phone,gend,birth];
  var sql = "insert into info_person (id,pw,email,name,addr,phone,gend,birth) value (?,?,?,?,?,?,?,?);";
  
  console.log('data: '+ data);
  pool.getConnection(function(err,connection){
    connection.query(sql,data,function(err,rows){
      res.redirect('login');
      connection.release();
    });
  });

});


module.exports = router;
