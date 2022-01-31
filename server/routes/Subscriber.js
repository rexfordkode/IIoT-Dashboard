var express = require('express');
var router = express.Router();

/*Getting Subscriber bench mark test*/


router.get('/', (req, res, next) =>{
    res.send('Subscribers test bench results')
})

module.exports = router;