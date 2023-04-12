const Shape = require("../models/shapeModel")


const getShapes = async(req, res)=>{
    try{
        const shapes = await Shape.find()
        res.json(shapes)

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}


const createShape = async(req, res)=>{
    try{
        const {name} = req.body
        const shape = await Shape.findOne({name})
        if(shape)
        return res.status(500).json({message: "This shape is already exists."})

        const newShape = new Shape({name})
        await newShape.save()

        res.json("Admin access granted")

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}


const deleteShape = async(req, res)=>{
    try{
        await Shape.findByIdAndDelete(req.params.id)
        res.json({msg:"Shape deleted"});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}


const updateShape = async(req, res) =>{
    try{
        const {name} = req.body
        await Shape.findOneAndUpdate({_id: req.params.id}, {name})

        res.json("Shape updates successfully")

    }catch(err){
        return res.status(500).json({mssg: err.mssg})
    }
}


module.exports ={getShapes, createShape, deleteShape, updateShape}