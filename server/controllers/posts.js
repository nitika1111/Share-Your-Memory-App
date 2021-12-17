//import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

// get all posts
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;
    const totalPosts = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalPosts / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get single posts
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get all posts by searchQuery
export const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, 'i'); //ignore case

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: posts });
    //console.log('Inside controller getPostsBySearch---> data:', data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// create a post
export const createPost = async (req, res) => {
  const post = req.body;
  // const newPost = new PostMessage(post);
  // const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  // check if id is valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Post ID');

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};
// delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  // check if id is valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Post ID');
  try {
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post Deleted Successfully.' });
  } catch (error) {
    console.error(error);
  }
};

// like a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Post ID');
  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // Like
      post.likes.push(req.userId);
    } else {
      // Dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
  }
};
