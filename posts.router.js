import express from "express";
import { prisma } from "./utils/prisma/index.js";

const router = express.Router();

router.post("/posts", async (req, res, next) => {
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
});

router.get("/posts", async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
  return res.status(200).json({ data: posts });
});

router.put("/posts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatePost = await prisma.posts.update({
    where: {
      id: +id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  const resUpPost = {
    id:updatePost.id,
    title:updatePost.title,
    content:updatePost.content
  }


  return res.status(201).json(resUpPost);
});

router.delete("/posts/:id", async (req, res, next) => {
  const { id } = req.params;

  await prisma.posts.delete({
    where: {
      id: +id,
    },
  });
  return res.status(200).json({ message: "success" });
});

export default router;
