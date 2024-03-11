const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const router = express.Router();

const createNewPost = async (req, res) => {
    const { title, content } = req.body;

    const createdPost = await prisma.posts.create({
        data: {
        title: title,
        content: content,
        },
    });

    const resCreatPost = {
        id: createdPost.id,
        title: createdPost.title,
        content: createdPost.content,
    };

    return res.status(201).json(resCreatPost);
    };

const getAllPosts = async (req, res) => {
    /** (구현) **/
    const posts = await prisma.posts.findMany({
        select: {
        id: true,
        title: true,
        content: true,
        },
    });
    return res.status(200).json({ data: posts });
    };

const updatePost = async (req, res) => {
        /** (구현) **/
        const { id } = req.params;
        const { title, content } = req.body;
    
        const updatedPost = await prisma.posts.update({
        where: {
            id: +id,
        },
        data: {
            title: title,
            content: content,
        },
        });
    
        const resUpPost = {
        id: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
        };
    
        return res.status(201).json(resUpPost);
    };

const deletePostById = async (req, res) => {
        /** (구현) **/
        const { id } = req.params;

        await prisma.posts.delete({
        where: {
            id: +id,
        },
        });
        return res.status(200).json({ message: "success" });
    };

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:id', updatePost);
router.delete('/api/posts/:id', deletePostById);

module.exports = router;
