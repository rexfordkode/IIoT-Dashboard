var express = require('express');
var router = express.Router();

/*Getting Publishers bench mark test*/


router.get('/', (req, res, next) =>{
    res.send('Publishers test bench results')
})

module.exports = router;