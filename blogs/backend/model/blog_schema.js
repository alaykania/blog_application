const mongoose=require('mongoose');

const blog_schema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        body:{type:String,required:true},
        email:{type:String,required:true}
    }
)

const Blog_schema=mongoose.model('Blog',blog_schema);

module.exports=Blog_schema;