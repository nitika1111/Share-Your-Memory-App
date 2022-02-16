import * as api from '../api/index.js';
import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes.js';

// Action Creators
// get all Posts
export const getPosts = (page) => async (dispatch) => {
  try {
    console.log('Niti---> getPosts: Page= ', page);
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

// get a Post
export const getPost = (id) => async (dispatch) => {
  try {
    console.log('Niti---> in Action Creator getPost: Post id= ', id);

    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

// get posts by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    console.log('Inside action/posts---> data= ', data);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};

// create a new post
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    //console.log('Niti---> createPost', data);
    history.push(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

// Update a Post
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

// delete a Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.error(error);
  }
};

// Like a Post
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.error(error);
  }
};

// Comment on a post
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.error(error);
  }
};
