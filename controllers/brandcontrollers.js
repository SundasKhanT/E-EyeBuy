const Brand = require('../models/brandModel')


const getBrands = async(req, res)=>{
    try{
        const brands = await Brand.find()
        res.json(brands)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const createBrand = async (req, res) =>{
    try{
        const {name} = req.body
        const brand = await Brand.findOne({name})
        if(brand)
        return res.status(500).json({msg: "This brand alredy exists"})

        const newType = new Brand({name})
        await newType.save()

        res.json("Admin access granted")
    }catch(err){
        return res.status(500).json({msg: err.message})

    }

}

const deleteBrand = async(req, res)=>{
    try{
        await Brand.findByIdAndDelete(req.params.id)
        res.json({message:"Brand deleted successfully"})

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateBrand = async(req, res) => {
    try{
        const {name} = req.body
        await Brand.findOneAndUpdate({_id:req.params.id}, {name})

        res.json({message:"Brand updated successfully"})

    }catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {getBrands, createBrand, deleteBrand, updateBrand}

