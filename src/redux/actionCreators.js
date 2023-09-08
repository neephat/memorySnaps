import axios from 'axios';
import * as actionTypes from './actionTypes';
import { baseUrl } from './baseUrl';

export const addComment = (imageId, comment, rating, author ) => dispatch=>{
    const newComment = {
        imageId: imageId,
        comment: comment,
        rating: rating,
        author: author,
        
    }
    newComment.date = new Date().toISOString();

    axios.post(baseUrl + 'comments', newComment)
    .then((response) => response.data)
    .then((comment) => dispatch(commentConcat(comment)))
}
export const commentConcat = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const commentLoading = () => {
    return {
        type: actionTypes.COMMENT_LOADING
    }
}
export const loadComments = (comments) => {
    return {
        type: actionTypes.LOAD_COMMENTS,
        payload: comments
    }
}
export const fetchComments = () => {
    return (dispatch) => {
        dispatch(commentLoading());

        axios.get(baseUrl + 'comments')
        .then((response) => response.data)
        .then((comments) => dispatch(loadComments(comments)))
    }
}


export const loadImages = (images) => {
    return {
        type: actionTypes.LOAD_IMAGES,
        payload: images
    }
}

export const imagesLoading = () => {
    return {
        type: actionTypes.IMAGES_LOADING
    }
}

export const imagesFailed = (errMessage) => {
    return {
        type: actionTypes.IMAGES_FAILED,
        payload: errMessage
    }
}
export const fetchImages = () => {
    return (dispatch) => {
        dispatch(imagesLoading());
        
        axios.get(baseUrl + 'images')
        .then((response)=> response.data)
        .then((images)=> dispatch(loadImages(images)))
        .catch((error) => dispatch(imagesFailed(error.message)))
    }
}

export const filterImages = (data)=>{
    return {
        type: actionTypes.FILTER_IMAGES,
        payload: data
    }
}