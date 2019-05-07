const Post = require('../models/post');
const Log = require('../models/log');
const User=require('../models/user');

exports.post_create = function (req, res) {
    let post1 = new Post(
        {
            title: req.body.title,
            content: req.body.content,
            username: req.body.username,
            companyid: req.body.companyid,
            upvote: req.body.upvote,

        }
    );
    var tagString=req.body.tag;
    var tags= tagString.split(",");
    for(var i=0;i<tags.length;i++)
    {
        //console.log(tags[i]+"\n");
        post1.tag.push(tags[i]);
    }
    post1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('post Created successfully')
    });
    var logItem=req.body.username + " created a new post";
    let log = new Log(
        {
            item:logItem
        });
    log.save(function (err) {
        if (err) {
            return next(err);
        }
    })
   // res.send('Create_Post route working!')
};
exports.show_posts = function (req , res) {
    Post.find({}).then(function (posts) {
        res.send(posts);
    });
};
exports.show_posts = function (req , res) {
    res.send('postman is working')
};

exports.search = function(req,res){
    var searchitem = req.body.searchitem;
    var keywords=searchitem.split(" ");
    console.log(searchitem);
    Post.find({tag:{$in: keywords} }, function (err, post) {
        res.send(post);
    });
}