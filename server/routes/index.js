const express=require('express')
const {Router}=express
const router=Router()

const{getPosts,getPostsbyUserId,createUser,createPost}=require('../controllers')

router.get('/posts',getPosts)

router.get('/posts/user/:userId',getPostsbyUserId)

router.post('/users',createUser)

router.post('/posts',createPost)

module.exports=router