import express from 'express';
const router = express.Router();
import  blogController from '../controllers/postController.js';
import multer from 'multer';

//Post Image
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './src/postImages');
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields(
  [
    {
    name: 'post', 
    maxCount: 900
    }, 
    {
      name: 'author', 
      maxCount: 1
    }
 ]
);

                                           
router.route('/getAllPosts')
    .get(blogController.getPosts)


router.route('/getSinglePost/:id')
    .get(blogController.getPostsById)

router.route('/getPostsByCategory/:category')
    .get(blogController.getPostsByCategory)


router.route('/deletePost/:id')
 .delete(blogController.deletePostById)
 
router.put(
    "/updatePost/:id", upload, 
    blogController.updatePostById
    )
 
router.post(
  "/createPost", upload, 
  blogController.createPost
  )


export default router;