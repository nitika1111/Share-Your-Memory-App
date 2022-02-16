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

export default (state = { isLoading: true, posts: [] }, action) => {
  //console.log('Inside posts reducer, action.payload: ', action.payload);
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload.data,
      };
    case CREATE:
      return { ...state.posts, posts: [...state, action.payload] };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    // case COMMENT:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post._id === action.payload._id ? action.payload : post
    //     ),
    //   };
    default:
      return state;
  }
};
