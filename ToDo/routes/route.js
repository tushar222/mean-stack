const express = require('express');
const router = express.Router();

const ToDo = require('../models/todo');

// router.get('/todo', function(req, res, next){
//     res.send('retriving the todo list...');
// })



router.get('/todos',function(req, res, next){
    ToDo.find(function(err,todos){
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    });
});


// router.get('/todos/:id',function(req, res, next){
//     db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,todo){
//         if(err){
//             res.send(err);
//         }else{
//             res.json(todo);
//         }
//     });
// });

router.post('/todos',function(req,res,next){
  
   let newTodo = new ToDo({
       text: req.body.text,
       isCompleted: req.body.isCompleted
   });

   newTodo.save(function(err, todo){
    if(err){
        res.send(err);
    }else{
        res.json({msg: 'todo added..!!'});
    }
   });


});


// router.put('/todos/:id',function(req, res, next){
//     var todo = req.body;
//     var updO = {};

//     if(todo.isCompleted){
//         updO.isCompleted = todo.isCompleted;
//     }

//     if(todo.text){
//         updO.text = todo.text;
//     }

//     if(!updO){
//         res.status(400);
//         res.json({"error":"invalid data"});
//     }else{
//         db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updO, {}, function(err, result){
//             if(err){
//                 res.send(err);
//             }else{
//                 res.json(result);
//             }
//            });
//     }
// });


router.delete('/todos/:id',function(req, res, next){
    
        ToDo.remove({_id:req.params.id },function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json('todo deleted');
            }
           });
    
});

module.exports = router;