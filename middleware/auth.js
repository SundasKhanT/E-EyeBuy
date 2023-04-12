const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        const token = req.header('Authorization');
        if(!token)
        return res.status(400).json({msg: "Authentication required"})

        jwt.verify(token, process.env.SECRET,(err, user)=>{
            if(err) return res.status(err).json({msg: "Invalid Authentication"})

            req.user = user
            next()
        })

    }catch(err){
        return res.status(500).json({mssg: err.message})
    }
}


module.exports = auth