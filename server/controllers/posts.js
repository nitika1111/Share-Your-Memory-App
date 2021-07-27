//import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    //console.log('Niti---> postMessages: ', postMessages);

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  // const post = req.body;
  // const newPost = new PostMessage(post);
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

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

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Post ID');
  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
  }
};