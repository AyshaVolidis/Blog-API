let {users,posts}=require('../models/data.js')

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


users.push({
    "id": 1,
    "firstname": "aysha",
    "secondname": "volidis",
    "password": "aysha22"
})


const getPosts=(req,res)=>{
    try{
        res.status(200).json(posts)
    }catch(err){
        res.status(404).send('posts not found')
    }
}

const getPostsbyUserId=(req,res)=>{
    try{
        let {userId}=req.params
        if(!users.some(u=>u.id==userId))throw new TypeError(`User ${userId} Not Fount`)
        let userPosts=posts.filter(p=>p.userId==userId)
        res.status(200).json(userPosts)

    }catch(err){
        res.status(404).send(err.message)
    }
}


const createUser=(req,res)=>{
    try{
        let user=req.body
        console.log(user)
        if(Object.keys(user).length===0)throw new TypeError('Enter vaild user')
        let keysArr=['id','firstname','secondname','password']
        keysArr.forEach((k)=>{
            if(!user.hasOwnProperty(k))throw new TypeError('Enter vaild user with data id,firstname,secondname,password')
        })
        if(users.some(u=>u.id==user.id))throw new TypeError("There is user has this id ,Enter anthor one")
        users.push(user)
        res.status(201).send(user)

    }catch(err){
        res.status(400).send(err.message)
    }
}

const createPost=(req,res)=>{
    try{
        let post=req.body
        console.log(post)
        if(Object.keys(post).length===0)throw new TypeError('Enter vaild post')
        let keysArr=['userId','title','content']
        keysArr.forEach((k)=>{
            if(!post.hasOwnProperty(k))throw new TypeError('Enter vaild post with data userId,title,content')
        })
        if(!users.some(u=>u.id==post.userId))throw new TypeError("No User has this Id ,Enter vaild id")
        posts.push(post)
        res.status(201).send(post)
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports={getPosts,getPostsbyUserId,createUser,createPost}