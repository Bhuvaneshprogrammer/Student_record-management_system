const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// MODEL
const schema = new mongoose.Schema({
    name: { type:String, required:true },
    age: { type:Number, required:true },
    dept: { type:String, required:true },
    email: { type:String, unique:true, required:true },
    regNo: { type:String, unique:true, required:true }
});

const Model = mongoose.model("Student", schema);

// SERVICE
class Service{

async create(data){

    if(!data.name || !data.email || !data.age || !data.regNo)
        throw "All fields required";

    if(data.age <= 0) throw "Invalid age";

    const emailReg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailReg.test(data.email)) throw "Invalid email";

    const regNoPattern=/^[0-9]{12}$/;
    if(!regNoPattern.test(data.regNo))
        throw "Register Number must be 12 digits";

    // manual check (optional but clear message)
    const emailExists = await Model.findOne({email:data.email});
    if(emailExists) throw "Email already exists";

    const regExists = await Model.findOne({regNo:data.regNo});
    if(regExists) throw "Register Number already exists";

    try{
        return await Model.create(data);
    }catch(e){
        if(e.code === 11000){
            if(e.keyPattern.email) throw "Email already exists";
            if(e.keyPattern.regNo) throw "Register Number already exists";
        }
        throw "Error creating student";
    }
}

async getAll(q){
    let {page=1,limit=5,sort="name",search=""}=q;

    page=parseInt(page);
    limit=parseInt(limit);

   const filter = {
    $or: [
        { name: { $regex: search, $options: "i" } },
        { regNo: { $regex: search, $options: "i" } }
    ]
};
    const data=await Model.find(filter)
        .sort({[sort]:1})
        .skip((page-1)*limit)
        .limit(limit);

    const count=await Model.countDocuments(filter);

    return {data,count};
}

get(id){ return Model.findById(id); }

async update(id,data){

    if(data.age && data.age<=0)
        throw "Invalid age";

    if(data.email){
        const emailReg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailReg.test(data.email)) throw "Invalid email";
    }

    if(data.regNo){
        const regNoPattern=/^[0-9]{12}$/;
        if(!regNoPattern.test(data.regNo))
            throw "Register Number must be 12 digits";
    }

    try{
        return await Model.findByIdAndUpdate(id,data,{new:true});
    }catch(e){
        if(e.code === 11000){
            if(e.keyPattern.email) throw "Email already exists";
            if(e.keyPattern.regNo) throw "Register Number already exists";
        }
        throw "Error updating student";
    }
}

delete(id){ return Model.findByIdAndDelete(id); }

}

const service=new Service();

// LOGIN
app.post("/api/login",(req,res)=>{
    const {u,p}=req.body;

    if(u==="admin" && p==="1234")
        res.json({ok:true});
    else res.status(401).json({msg:"Invalid"});
});

// ROUTES
app.get("/api/students", async (req,res)=>{
    res.json(await service.getAll(req.query));
});

app.get("/api/students/:id", async (req,res)=>{
    res.json(await service.get(req.params.id));
});

app.post("/api/students", async (req,res)=>{
    try{
        res.json(await service.create(req.body));
    }catch(e){
        res.status(400).json({msg:e});
    }
});

app.put("/api/students/:id", async (req,res)=>{
    try{
        res.json(await service.update(req.params.id,req.body));
    }catch(e){
        res.status(400).json({msg:e});
    }
});

app.delete("/api/students/:id", async (req,res)=>{
    res.json(await service.delete(req.params.id));
});

app.listen(3000,()=>console.log("Running"));