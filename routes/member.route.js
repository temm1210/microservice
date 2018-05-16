var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('config');
require('../passport-jwt/passport')(passport);


router.get('/', (req, res, next) => {
    Member.find((err, members) => {
        console.log('GOOOD')
        res.json(members);
    })
})

router.get('/:id', (req, res, next) => {
    Member.find({id:req.params.id}, (err, member) => {
        if(member) res.json(member);
        else false;
    })
})

router.post('/signin', (req,res,next) => {
    console.log('route signin')
    console.log('req.body:',req.body)
    Member.findOne({id:req.body.id}, (err, member) => {

        console.log('member:',member)
        if(!member) res.json({result:false, msg:'User not exist with match info'})
        else { 
            member.comparePassword(req.body.pwd, (err, isMatch) => {
                console.log('isMatch:',isMatch)
                console.log('err:',err)
                if(isMatch && !err){
                    let token = jwt.sign(member.toJSON(), config.get('secret') );
                    res.json({result: true, member:member, token: 'JWT ' + token});
                }else {
                    res.json({result:false, msg:'Password not match'});
                }

            })
        }
    })
})

router.post('/signup', (req, res, next) => {
    console.log('route signup')
    console.log('req.body:',req.body)

    Member.create(req.body, (err, member) => {
        if(err) return res.json({result: false, msg: 'User save error'})
        res.json({result: true, msg: `Suceess join welcome ${member.id}`});
    })
})

module.exports = router;
