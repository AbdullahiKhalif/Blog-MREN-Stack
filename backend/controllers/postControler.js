import chalk from "chalk";
import Post from "../models/Posts.js";
import expressAsyncHandler from "express-async-handler";

export const createPost = expressAsyncHandler(async (req, res) => {
  const newPost = new Post({ ...req.body, author: req.user._id });
  await newPost.save();
  res.status(200).send({ status: true, message: newPost });
});

export const getAllPosts = async (req, res) => {
  const allPosts = await Post.find().populate("author", "-password");
  if (!allPosts) {
    return res
      .status(404)
      .send({ status: false, message: "Post Are Not Found" });
  }

  res.status(200).send(allPosts);
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("author", [
      "username",
      "email",
    ]);

    if (!post) {
      return res.status(404).send({ status: false, message: "Post Not Found" });
    }
    res.status(200).send(post);
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR AT GET POST ")}, ${err}`);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;
    const updatedPost = await Post.findById(postId);

    if (!updatePost)
      return res
        .status(403)
        .send({ status: false, message: "Not Found THis Post Id" });

    // get current user
    const currentUser = req.user._id;

    if (currentUser.toString() !== updatedPost.author.toString()) {
      return res
        .status(403)
        .send({
          status: false,
          message: "Post is only can update by the original author",
        });
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { title, content },
      { new: true }
    );

    res.status(200).send("Updated Successfully✔");
  } catch (err) {
    console.log("ERROR AT UPDATE POST", err);
    res.status(400).send({ status: false, message: "NOT FOUND THE POST ID" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findById(postId);
    if(!deletePost) return res.status(404).send({status: false, message: "Not Found Post Id"});

    const currentUser = req.user._id;
    if(currentUser.toString() !== deletedPost.author.toString()){
        return res.status(403).send({status: false, message: "Post is only can deleted by the original author ❌"});
    }

    await Post.findByIdAndRemove(postId);
    res.status(200).send("Successfully deleted post✔")
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR AT DELETE POST ")}, ${err} `);
    res
      .status(404)
      .send({
        status: false,
        message: `NOT FOUND THE POST ID: ${err.message}`,
      });
  }
};

