import axios from 'axios';

const url = 'https://memories-nitika.herokuapp.com';
//const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

// fetch a single Post
export const fetchPost = (id) => API.get(`/posts/${id}`);
//export const fetchPost = (id) => API.get(`${url}/${id}`);

// fetch all posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
//export const fetchPosts = (page) => API.get(`${url}?page=${page}`);

// fetch all posts as per searchQuery
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );

// create a new Post
export const createPost = (newPost) => API.post('/posts', newPost);

// update a  Post
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

// delete a  Post
export const deletePost = (id) => API.delete(`/posts/${id}`);

// like a  Post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// comment on a  Post
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

// Sign In
export const signin = (formdata) => API.post(`/user/signin`, formdata);

// Sign Up
export const signup = (formdata) => API.post(`/user/signup`, formdata);
