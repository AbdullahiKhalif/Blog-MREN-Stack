import express from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/postControler.js';
import { validationPostRegistration } from '../validations/Posts.js';
import { authenticate } from '../middleWares/authMiddleWare.js';
const postRouter = express.Router();

// postRouter.post('/',validationPostRegistration, authenticate, createPost);
// postRouter.get('/get-posts', getAllPosts);
// postRouter.get('/get-post/:id', getPost);
// postRouter.put('/update-post/:id', authenticate, updatePost);
// postRouter.delete('/delete-post/:id', authenticate, deletePost);

postRouter.route('/')
    .get(getAllPosts)
    .post(validationPostRegistration,authenticate,createPost);
postRouter.route('/:id')
    .get(getPost)
    .put(authenticate, updatePost)
    .delete(authenticate, deletePost)
export default postRouter;