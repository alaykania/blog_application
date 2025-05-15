const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const Form=require('./model/form_schema');
const router = express.Router();
app.use(express.json());
app.use(cors());
const Blog=require('./model/blog_schema');
mongoose.connect("mongodb+srv://Alay29854:Alay29854@clusters.vn51u.mongodb.net/");
{
    console.log("mongodb connected succesfully");
}

app.post('/api/createform',async(req,res)=>
    {
        const {title, body,email }=req.body;
    
        try
        {
            const BlogForm=new Blog({title, body,email:email});
            await BlogForm.save();
            res.status(200).send("Blog created Successfully");
        }
        catch(error)
        {
            console.log(error)
            res.status(400).send("Failed to create blog");
        }
    });


app.post('/api/form',async(req,res)=>
    {
        const {name,email,number,password}=req.body;
    
        try
        {
            const newForm=new Form({name,email,number,password});
            await newForm.save();
            res.status(200).send("Registed Successfully");
        }
        catch(error)
        {
            res.status(400).send("Failed to registed");
        }
    });
    
    app.post('/api/login',async(req,res)=>
    {
        const {email,password}=req.body;
    
        try
        {
           const user=await Form.findOne({
            $and:[{ email: email},{ password: password }]
           });
    
           if(!user)
           {
                res.status(400).send("Invalid password");
           }
           res.status(200).send("Login successful");
    
        }
        catch(error)
        {
            res.send("error is",error);
            
        }
        
    })
    
app.get("/api/blogs",async(req,res)=>
{
    try
    {
        const blogs=await Blog.find();
        res.json(blogs);
    }
    catch(error)
    {
        console.log(error);
    }
});
app.get('/api/myblogs/:email', async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters

    try {
        const blogs = await Blog.find({ email: email }); // Query the database for blogs with the specified email
        res.status(200).json(blogs); // Return the blogs as a JSON response
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.post('/api/users',async(req,res)=>{
    const {email,number}=req.body;

    try {
        const user = await Form.findOne({
            $or: [{ email }, { number }]
        });

        if (user) {
            return res.json({ userExists: true });
        } else {
            return res.json({ userExists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error checking user");
    }
});
app.get("/api/blogss/:id",async(req,res)=>
{
    try
    {
        const { id }=req.params;
        const blog = await Blog.findById(new mongoose.Types.ObjectId(id));
        res.json(blog);
       
    }
    catch(error)
    {
        console.log(error);
    }


});
// server.js (backend)
app.put('/api/blogss/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBlog = req.body;  // Get the updated blog data from the request body
  
      // Find the blog by ID and update it
      const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  
      if (!blog) {
        return res.status(404).send('Blog not found');
      }
  
      res.status(200).json(blog);  // Return the updated blog data
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  app.delete('/api/blogss/delete/:id',async(req,res)=>
  {
    try
    {
        const { id } = req.params;

        const deletes=await Blog.findByIdAndDelete(id);
        if(deletes)
        {

            res.status(200).send("Delete successfully");
        }
       
        


    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }

  });
  

// Get blogs for a specific author


// Edit blog (only by author)


app.listen(5002);

