const Type = require("../models/typeModel")

const getTypes= async(req, res)=>{
    try{
        const types = await Type.find()
        res.json(types)

    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const createType = async (req, res) =>{
    try{
        const {name} = req.body
        const type = await Type.findOne({name})
        if(type)
        return res.status(500).json({msg: "This type alredy exists"})

        const newType = new Type({name})
        await newType.save()

        res.json("Admin access granted")
    }catch(err){
        return res.status(500).json({msg: err.message})

    }

}

const deleteType=async (req, res) => {
    try{
        await Type.findByIdAndDelete(req.params.id)
        res.json({msg: "Type deleted"})

    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

const updateType= async(req, res)=>{
    try{
        const {name} = req.body
        await Type.findOneAndUpdate({_id: req.params.id},{name})

        res.json("Type updated succesfully")

    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}



module.exports={getTypes, createType, deleteType, updateType}