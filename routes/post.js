const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// http://localhost:5000/api/post (GET)
router.get('/', async (req, res) => {

    const posts = await Post.find({});
    res.status(200).json(posts);

});

// http://localhost:5000/api/post (POST)
router.post('/', async (req, res) => {

    const postData = {
        title: req.body.title,
        text: req.body.text
    }

    const post = new Post(postData) // создаём новый пост

    await post.save() // ждём пока наш пост сохранится на сервере
    res.status(201).json(post)

});

// http://localhost:5000/api/post/id (DELETE)
router.delete('/:postId', async (req, res) => {

    await Post.remove({_id: req.params.postId})
    res.status(200).json({
        message: 'Удалено'
    })

});

module.exports = router;