import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { createForms } from 'react-redux-form';
import { initialContactForm } from './forms';


const authReducer = (authState={auth: [], token: null, userId: null, authLoading: false, authFailedMsg: null}, action)=>{
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...authState,
        auth: [],
        token: action.payload.token,
        userId: action.payload.userId
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...authState,
        authFailedMsg: null,
        token: null,
        userId: null
      }
    case actionTypes.AUTH_LOADING:
      return {
        ...authState,
        authLoading: action.payload
      }
    case actionTypes.AUTH_FAILED:
      return {
        ...authState,
        authFailedMsg: action.payload
      }
    default:
      return authState
  }
}
const imageReducer = (
  imageState = {
    isLoading: false,
    images: [],
    filter: 'all',
    errMessage: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.IMAGES_LOADING:
      return {
        ...imageState,
        isLoading: true,
        errMessage: null,
        images: [],
      };
    case actionTypes.LOAD_IMAGES:
      return {
        ...imageState,
        isLoading: false,
        errMessage: null,
        images: action.payload,
      };
    case actionTypes.IMAGES_FAILED:
      return {
        ...imageState,
        isLoading: false,
        errMessage: action.payload,
        images: [],
      };
    case actionTypes.FILTER_IMAGES:
      return {
        ...imageState,
        filter: action.payload,
      };
    
    default:
      return imageState;
  }
};
const commentReducer = (
  commentState = { isLoading: true, comments: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.LOAD_COMMENTS:
      return {
        ...commentState,
        isLoading: false,
        comments: action.payload,
      };
    case actionTypes.COMMENT_LOADING:
      return {
        ...commentState,
        isLoading: true,
        comments: [],
      };
    case actionTypes.ADD_COMMENT:
      let comment = action.payload;
      return {
        ...commentState,
        comments: commentState.comments.concat(comment),
      };

    default:
      return commentState;
  }
};
export const rootReducer = combineReducers({
  images: imageReducer,
  comments: commentReducer,
  auth: authReducer,
  ...createForms({
    feedback: initialContactForm,
  }),
});