const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(req, res, next)

    res.send({
        code: 200,
        data: {
            hd: '1'
        }
    })
})
router.post('/', (req, res, next) => {
    console.log(req, res, next)

    res.send({
        code: 200,
        data: {
            hd: '1'
        }
    })
})
module.exports = router;