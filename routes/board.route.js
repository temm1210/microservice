var express = require('express');
var router = express.Router();
var Board = require('../models/Board');

router.get('/', (req, res) => {
    let keyword = req.query.keyword
    let reg = {$regex:keyword, $options:'i'};

    Board.find().or([{ title:reg },{writer:reg}, {contents:reg}])
        .sort({date:-1, _id:-1})
        .exec( (err, boards) => {
            console.log('err:',err)
            if(err) res.json({result:false, msg:'Get Boards fail!'})
            else res.json({result:true, boards:boards});
        })
})

router.get('/:id', (req, res) => {
    Board.findOneAndUpdate({_id: req.params.id},{$inc:{count:1}}, (err, board) => {
        if(err) res.json({result:false, msg:'Get Boards fail!'})
        else res.json({result:true, board:board});
        
    })
})

router.put('/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, req.body, (err, board) => {
        if(err) res.json({result:false, msg:'update is faile'})
        else res.json({result:true, msg:'success update'});
    })
})

router.delete('/:id', (req, res) => {
    Board.findByIdAndRemove(req.params.id, (err, board) => {
        if(err) res.json({result:false, msg:'delete is faile'})
        else res.json({result:true, msg:'success delete'});
    })
})


router.post('/', (req, res) => {
    Board.create(req.body, (err, board) => {
        console.log('req.body:', req.body)
        if(err) res.json({result:false, msg:`${board} is fail`})
        else res.json({result:true, board:board})
    })
})
module.exports = router;