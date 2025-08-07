let {users,posts}=require('../models/data.js')
const path=require('path')

posts.push({
  "userId": 1,
  "title": "My First Post",
  "content": "This is the content of my very first post. Hello world!"
})

posts.push({
    "userId": 1,
  "title": "My Scound Post",
  "content": "This is the content of my very secound post. NiceBlog!"
})
//           delete
posts.push({
    "userId": 2,
  "title": "walaa post",
  "content": "This is the content of my very secound post. NiceBlog!"
})


users.push({
    "id": 1,
    "firstname": "aysha",
    "secondname": "volidis",
    "password": "aysha22"
})
//           delete
users.push({
    "id": 2,
    "firstname": "walaa",
    "secondname": "volidis",
    "password": "aysha22"
})

const getHomePage=(req,res)=>{
    res.sendFile(path.join(__dirname,"..","..","public","index.html"))
}

const getPosts=(req,res)=>{
    try{
        let myposts=posts.map(post=>{
            let userPost=users.find(u=>u.id==post.userId)
            return {...post,userName:userPost.firstname+' '+userPost.secondname}
        })
        res.status(200).json({message:'posts return successfully',posts:myposts})
    }catch(err){
        res.status(404).send({message:err.message})
    }
}

const getPostsbyUserId=(req,res)=>{
    try{
        let {userId}=req.params
        if(!users.some(u=>u.id==userId))throw new TypeError(`User ${userId} Not Fount`)
        let userPosts=posts.filter(p=>p.userId==userId).map(post=>{
            let userPost=users.find(u=>u.id==post.userId)
            return {...post,userName:userPost.firstname+' '+userPost.secondname}
        })
        res.status(200).json({message:'posts return successfully',posts:userPosts})

    }catch(err){
        res.status(404).send({message:err.message})
    }
}


const createUser=(req,res)=>{
    try{
        let user=req.body
        if(Object.keys(user).length===0)throw new TypeError('Enter vaild user')
        if(!user.hasOwnProperty('id')){
            user={id:users.length+1,...user}
        }
        let keysArr=['id','firstname','secondname','password']
        keysArr.forEach((k)=>{
            if(!user.hasOwnProperty(k))throw new TypeError('Enter vaild user with data id,firstname,secondname,password')
        })
        if(users.some(u=>u.id==user.id))throw new TypeError("There is user has this id ,Enter anthor one")
        users.push(user)
        res.status(201).send({message:'user created successfully',user:user})

    }catch(err){
        res.status(400).send({message:err.message})
    }
}

const createPost=(req,res)=>{
    try{
        let post=req.body
        if(Object.keys(post).length===0)throw new TypeError('Enter vaild post')
        let keysArr=['userId','title','content']
        keysArr.forEach((k)=>{
            if(!post.hasOwnProperty(k))throw new TypeError('Enter vaild post with data userId,title,content')
        })
        if(!users.some(u=>u.id==post.userId))throw new TypeError("No User has this Id ,Enter vaild id")
        posts.push(post)
        res.status(201).send({message:'post created successfully',post:post})
    }catch(err){
        res.status(400).send({message:err.message})
    }
}

module.exports={getPosts,getPostsbyUserId,createUser,createPost,getHomePage}