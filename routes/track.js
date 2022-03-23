const router = require('express').Router();
const { User, Sound } = require('../db/models');

const uploadPhoto  = require('../middleware/uploadPhoto')

const { create, addLike, deleteTrack, openEditor, updateSound } = require('../controlers/trackControler');

router.post('/upload', uploadPhoto, create);

router.post('/addLike', addLike);

router.get('/sound/:id/edit', openEditor)

router.put('/sound/:id', updateSound);

router.delete('/delete', deleteTrack)

module.exports = router;
