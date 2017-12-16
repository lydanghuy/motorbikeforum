const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
var User = require('../database/user');


const Threads = require('../database/thread');
const threadRouter = express.Router();
threadRouter.use(bodyParser.json());

//General
threadRouter.route('/general')
.get((req,res,next) => {
    Threads.find({category : "general"})
    .populate('thread_author')
    .then((threads) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var array_allthread = [];
        for(var i = (threads.length - 1) ; i>=0 ; i--){
            var object_allthread = {};
            object_allthread.id = threads[i]._id;
            object_allthread.title = threads[i].title;
            object_allthread.view = threads[i].view;
            object_allthread.comments = threads[i].comments.length;
            object_allthread.likes = threads[i].likes.length;
            object_allthread.last_comment = threads[i].comments[threads[i].comments.length - 1];
            array_allthread.push(object_allthread);
        }

        res.json(array_allthread);
    }, (err) => next(err))
    .catch((err) => next(err));
});
//Underbone
threadRouter.route('/underbone')
.get((req,res,next) => {
    Threads.find({category : "underbone"})
    .populate('thread_author')
    .then((threads) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var array_allthread = [];
        for(var i = (threads.length - 1) ; i>=0 ; i--){
            var object_allthread = {};
            object_allthread.id = threads[i]._id;
            object_allthread.title = threads[i].title;
            object_allthread.view = threads[i].view;
            object_allthread.comments = threads[i].comments.length;
            object_allthread.likes = threads[i].likes.length;
           
            object_allthread.last_comment = threads[i].comments[threads[i].comments.length - 1];
            array_allthread.push(object_allthread);
        }

        res.json(array_allthread);
      
    }, (err) => next(err))
    .catch((err) => next(err));
});
//Scooter
threadRouter.route('/scooter')
.get((req,res,next) => {
    Threads.find({category : "scooter"})
    .populate('thread_author')
    .then((threads) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var array_allthread = [];
        for(var i = (threads.length - 1) ; i>=0 ; i--){
            var object_allthread = {};
            object_allthread.id = threads[i]._id;
            object_allthread.title = threads[i].title;
            object_allthread.view = threads[i].view;
            object_allthread.comments = threads[i].comments.length;
            object_allthread.likes = threads[i].likes.length;
            
            object_allthread.last_comment = threads[i].comments[threads[i].comments.length - 1];
            array_allthread.push(object_allthread);
        }

        res.json(array_allthread);
       
    }, (err) => next(err))
    .catch((err) => next(err));
});
//Sportbike
threadRouter.route('/sportbike')
.get((req,res,next) => {
    Threads.find({category : "sportbike"})
    .populate('thread_author')
    .then((threads) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var array_allthread = [];
        for(var i = (threads.length - 1) ; i>=0 ; i--){
            var object_allthread = {};
            object_allthread.id = threads[i]._id;
            object_allthread.title = threads[i].title;
            object_allthread.view = threads[i].view;
            object_allthread.comments = threads[i].comments.length;
            object_allthread.likes = threads[i].likes.length;
          
            object_allthread.last_comment = threads[i].comments[threads[i].comments.length - 1];
            array_allthread.push(object_allthread);
        }

        res.json(array_allthread);
    
    }, (err) => next(err))
    .catch((err) => next(err));
});
//Get threads
threadRouter.route('/')
.get((req,res,next) => {
    Threads.find({})
    .populate('thread_author')
    .then((threads) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var array_allthread = [];
        for(var i = (threads.length - 1) ; i>=0 ; i--){
            var object_allthread = {};
            object_allthread.id = threads[i]._id;
            object_allthread.title = threads[i].title;
            object_allthread.view = threads[i].view;
            object_allthread.comments = threads[i].comments.length;
            object_allthread.likes = threads[i].likes.length;
      
            object_allthread.last_comment = threads[i].comments[threads[i].comments.length - 1];
            array_allthread.push(object_allthread);
        }

        res.json(array_allthread);
      
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
        req.body.thread_author = req.user._id;

        Threads.create(req.body)
        .then((thread) =>{
        thread.save();
        console.log('thread Created ', thread);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({thread, success: true});
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Threads');
})
.delete(authenticate.verifyUser, (req,res,next) => {
    if(req.user.admin === true){
        Threads.remove({})
        .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
        }, (err) => next(err))
    .catch((err) => next(err));
    }
    else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({status : "You are not allowed!"});
    }
});

//Searchbox routing
threadRouter.route('/searchbox/:searchquery').get(function(req,res){
      var threads_filtered=[];
     Threads.find({},function(err,response){
        for (var i=0;i< response.length;i++){
            var title_query = response[i].title.toLowerCase();

          if (title_query.indexOf(req.params.searchquery.split("&").join(" ")) != -1){
            threads_filtered.push(response[i]);
          }
        }
        res.json(threads_filtered);
      });
     
     console.log(req.params.searchquery);
});

//Thread ID
threadRouter.route('/:threadId')
.get((req,res,next) => {
    Threads.findById(req.params.threadId)
    .populate('comments.author').populate('thread_author')
    .then( (thread) =>{
        thread.view += 1;
        thread.save().then((thread) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(thread);
        });

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Threads/' + req.params.threadId);
})
.put(authenticate.verifyUser,(req,res,next) => {

})
.delete(authenticate.verifyUser,(req,res,next) => {
    if(req.user.admin === true){
    Threads.findByIdAndRemove(req.params.threadId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    }
    else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({status : "You are not allowed!"});
    }
});

//user liked
threadRouter.route('/:threadId/likes')
.get(authenticate.verifyUser , (req,res, next) => {
    Threads.findById(req.params.threadId)
    .populate('likes.like_author').populate('thread_author')
    .then( (thread) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(thread.likes);
        } ,(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res) =>{
    Threads.findById(req.params.threadId).populate('likes.like_author').then((thread) => {
        req.body.like_author = req.user._id;
        thread.likes.push(req.body);
        thread.view -=1;
        thread.save().then((thread)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(thread.likes);
        });
    });
});
threadRouter.route('/:threadId/likes/:likeId')
.delete(authenticate.verifyUser,(req,res,next) => {
    Threads.findById(req.params.threadId)
    .then((thread) =>{
        if( thread != null  && thread.likes.id(req.params.likeId) != null){
           thread.likes.id(req.params.likeId).remove(); // access to subdocument and remove
           thread.view -=1;
            thread.save()
            .then((thread)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(thread.likes);
            }, (err) => next(err));
        }
        else if(thread==null){
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }

        else{
            err = new Error('Like ' + req.params.likeId + ' not found.');
            err.status = 404;
            return next(err);
        }

    }, (err) => next(err))
    .catch((err) => next(err));
});



//comments_ID

threadRouter.route('/:threadId/comments')
.get((req,res,next) => {
    Threads.findById(req.params.threadId)
    .populate('comments.author')
    .then((thread) =>{
        if( thread != null ){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(thread.comments);
            console.log("User id: " + req.user._id);
        }
        else{
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    //console.log(req.user._id);
    Threads.findById(req.params.threadId)
    .then((thread) =>{
        if( thread != null ){
            req.body.author = req.user._id;
            thread.comments.push(req.body);
            thread.view -=1;
            thread.save()
            .then((thread)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(thread);
            }, (err) => next(err));

        }
        else{
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Threads/'
        + req.params.threadId + '/comments' );
})
.delete(authenticate.verifyUser,(req,res,next) => {
    if(req.user.admin === true){
    Threads.findById(req.params.threadId)
    .then((thread) =>{
        if( thread != null ){
            for(var i= (thread.comments.length - 1) ; i>=0 ; i--){
                thread.comments.id(thread.comments[i]._id).remove(); // access to subdocument and remove
            }
            thread.view -=1;
            thread.save()
            .then((thread)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(thread);
            }, (err) => next(err));
        }
        else{
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }

    }, (err) => next(err))
    .catch((err) => next(err));
    }
    else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({status : "You are not allowed!" , success : false});
    }
});

threadRouter.route('/:threadId/comments/:commentId')
.get((req,res,next) => {
    Threads.findById(req.params.threadId)
    .populate('comments.author')
    .then((thread) =>{
        if( thread != null && thread.comments.id(req.params.commentId) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(thread.comments.id(req.params.commentId));

            console.log("Author id: " + thread.comments.id(req.params.commentId).author._id);
            //console.log("User id: " + req.user._id);
        }
        else if(thread==null){
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' + req.params.commentId + ' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Threads/' + req.params.threadId
        + '/comments/' + req.params.commentId );
})
.put(authenticate.verifyUser,(req,res,next) => {
})
.delete(authenticate.verifyUser,(req,res,next) => {
    if(req.user.admin === true){
    Threads.findById(req.params.threadId)
    .then((thread) =>{
        if( thread != null  && thread.comments.id(req.params.commentId) != null){
           thread.comments.id(req.params.commentId).remove(); // access to subdocument and remove
           thread.view -=1;
            thread.save()
            .then((thread)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(thread);
            }, (err) => next(err));
        }
        else if(thread==null){
            err = new Error('thread ' + req.params.threadId + ' not found.');
            err.status = 404;
            return next(err);
        }

        else{
            err = new Error('Comment ' + req.params.commentId + ' not found.');
            err.status = 404;
            return next(err);
        }

    }, (err) => next(err))
    .catch((err) => next(err));
    }
    else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({status : "You are not allowed!" , success : false});
    }

});

module.exports = threadRouter;
