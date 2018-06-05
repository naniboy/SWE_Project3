var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connictionLimit: 4,
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: '940306'
});


/* GET home page. */
// router.get('/', function(req, res, next) {
//  pool.getConnection(function(err, connection){

//   connection.query('SELECT * From board', function(err,rows){
//     if(err) console.error("err: "+err);
//     console.log("rows : "+ JSON.stringify(rows));

//     res.render('index', { title: 'test',rows: rows });
//     connection.release();

//   });
//  });
 
 
  
// });

module.exports = router;
