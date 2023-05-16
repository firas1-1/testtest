const router = require('express').Router();
const verifyToken =require('./verifyToken');


router.get('/',verifyToken, async (req, res) => {
    res.json({
        posts: {
            title: 'my fisrt post',description:'ffff'
        } 

    });
    // Do something that requires authenticati
});
module.exports = router;
