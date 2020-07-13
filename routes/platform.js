const { Platform, validate } = require('../models/platform');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let platform = new Platform({ username: req.body.username, contact: req.body.contact });
    const error = validate(req.body);
    if (error.error != null) {
        console.log(error.error)
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request data',
            data: platform
        });
    }
    else {
        platform = await platform.save();
        res.status(200).json({
            status: 'success',
            message: 'user created successfully',
            data: platform
        });
    }


});

router.get('/', async (req, res) => {
        const platforms = await Platform.find().sort('name');
    res.send(platforms);
});

module.exports = router;