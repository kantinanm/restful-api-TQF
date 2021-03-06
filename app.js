var express = require('express');
var bodyParser = require('body-parser');
var util = require('./util_db');

var app = express();

var router = express.Router();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 3000;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Hello! welcome to our api!' });   
});

router.route('/course/create')

    // create a bear (accessed at POST http://localhost:3000/api/course/create)

.post(function(req, res) {

        // save the bear and check for errors
      
        var course_list = [];

        var course_tmp ={
          course_id:req.body.course_id , //course_id
          course_name :{
            thai : req.body.course_name_th, //course_name_th,
            english : req.body.course_name_en //course_name_en
          },
          desctiption: {
            thai : req.body.desctiption_th,  // desctiption_th
            english : req.body.desctiption_en   // desctiption_en
          },
          faculty: req.body.faculty_name  // faculty_name
        }
        
        course_list.push(course_tmp);
        console.log('course_list length :'+course_list.length);

        util.InsertCourse(course_list);

       res.json({ message: 'course created!',
                item :course_list  
                });
       
    //console.log('req :'+req.body.course_id);
});


app.use('/api', router);

router.route('/course')
 .get(function(req, res) {
       //res.json({ message: 'get all course !' });  
       
       util.ConnectDb(function(obj_db) {  
         var collection = obj_db.collection('course');
         collection.find().toArray(function(err, docs) {
           
              res.json(docs);
              console.log('docs length :'+docs.length);
              obj_db.close();
           });

       });
  });
app.use('/api', router);


app.listen(port);
console.log('Example app listening at http://%s:%s', port);