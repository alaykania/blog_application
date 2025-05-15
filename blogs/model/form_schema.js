const mongoose=require('mongoose');

const formschema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        number:{type:String,required:true},
        password:{type:String,required:true}
    }
);

const Form =mongoose.model("Form",formschema);

 module.exports=Form;