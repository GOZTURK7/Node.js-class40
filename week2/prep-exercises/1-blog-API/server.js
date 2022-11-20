import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import url from 'url';


import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
// YOUR CODE GOES IN HERE

app.use(express.json());
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  return
});

app.get('/create', (req, res)=>{
  res.sendFile(__dirname + '/create.html')
  return
});

app.get('/update', (req, res)=>{
  res.sendFile(__dirname + '/update.html');
  return
});

app.get('/delete', (req, res)=>{
  res.sendFile(__dirname + '/delete.html');
})

app.get('/search', (req, res)=>{
  res.sendFile(__dirname + '/search.html');
})

app.post('/create/posts', (req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  if (fs.existsSync(__dirname+`/posts/${title}`)) {
   throw new Error(`${title} already exists`);
  
  }else{
    fs.mkdirSync('./posts', { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.writeFileSync(__dirname+`/posts/${title}`, content);
    res.json({msg: 'ok'});
    // res.redirect('/');
  }
  
});


app.post('/update/posts', (req, res) => {
  // How to get the title and content from the request?
  const title = req.body.title;
  const content = req.body.content;
  const oldTitle = req.params.title;
  // What if the request does not have a title and/or content?
  if (fs.existsSync(__dirname+`/posts/${title}`)) {
    if(req.body.title && req.body.content){
      // fs.unlinkSync(__dirname+`/posts/${oldTitle}`)
      fs.writeFileSync(__dirname+`/posts/${title}`, content);
      res.json({msg : `The post '${title}'s content is updated with new content '${content}'`});
    }else{
      throw new Error(`The post must include title and content`);
    }
  }else {
    // Send response with error message
    throw new Error(`This post "${title}" does not exist! `);

  }
});


app.post('/delete/posts', (req, res) => {
  // const queryObject = url.parse(req.url, true).query;
  // console.log("queryObject : "+queryObject.title);
  const title = req.body.title;
  // console.log(title);
  if (fs.existsSync(__dirname+`/posts/${title}`)) {
      // fs.unlinkSync(__dirname+`/posts/${oldTitle}`)
      console.log('HELLO');
      fs.unlinkSync(__dirname+`/posts/${title}`);
      res.json({msg : `The Post '${title}' is deleted`});    
  }else {
    // Send response with error message
    throw new Error(`This post "${title}" does not exist! `);

  }

});

// app.get('/search/posts/:title', (req, res) => {
app.get('/search/posts', (req, res) => {
  // How to get the title from the url parameters?
  const myURL = new URL(req.url, 'http://localhost:3000');
  const title = myURL.searchParams.get('title');

  // const title = req.params.title;
  // check if post exists
  if (fs.existsSync(__dirname+`/posts/${title}`)) {
    const post = fs.readFileSync(__dirname+`/posts/${title}`);
      // send response
    res.json({post: `${post}`});
  }
});

app.get('/posts/all', (req, res) => {
  // how to get the file names of all files in a folder??
  const files = fs.readdirSync(__dirname+'/posts');
  
  let posts = [];

  files.forEach((title, key) => {
    const content = fs.readFileSync(__dirname+`/posts/${title}`).toString();
    let post = {};
    post.id = key+1;
    post.title = title;
    post.content=content;
    posts.push(post);
  });
  res.send(posts);
});


 
app.listen(3000, ()=>console.log(`The Server Running On Port 3000`));