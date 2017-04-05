const express = require ('express');
const router = express.Router();

var deleteS = router.post('/', (req, res) => {
    console.log("Session destroyed");
    req.session.destroy();
    res.clearCookie('btnExit')
        .send(true);
});
module.exports = deleteS;