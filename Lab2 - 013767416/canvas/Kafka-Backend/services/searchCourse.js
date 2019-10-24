
var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');

function handle_request(msg, callback){
    var criteria;
    if(msg.body.value === '=')
        criteria = msg.body.cnumber
    else
        criteria = "{" + msg.body.value +": '"+ msg.body.cnumber + "'}"
    console.log(criteria)
    Model.Coursedetails.find(
        {Dept: msg.body.cdept},
     (err, result) => {
        if(err){
            console.log('Error in Retrieving message data', err);
            callback(err, null);
        }
        else{
            console.log('Message result', result);
            callback(null, result);
        }
    });
}


exports.handle_request = handle_request;


// if(req.body.cname && req.body.cterm)
// var select = "select * from courses where dept like '%" + req.body.cdept + "%' and nickname " + req.body.value + req.body.cnumber + " and name like '%" + req.body.cname + "%' and term like '%" + req.body.cterm + "%' "
//else
// var select = "select * from courses where dept like '%" + req.body.cdept + "%' and nickname " + req.body.value + req.body.cnumber + " and courseid not in ( select courseid from enrollement_status where student_id = " + mysql.escape(req.session.user.userid) + ")"; 
