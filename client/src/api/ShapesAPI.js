import {useState, useEffect} from 'react'
import axios from 'axios'

const ShapesAPI = () => {
    const [shapes, setShapes] = useState([])
    const[callback, setCallback] = useState(false)

    useEffect(()=>{
        const getShapes = async () =>{
            const res = await axios.get('/api/shape')
            setShapes(res.data)
        }

        getShapes()
    }, [])


  return {
    shapes: [shapes,  setShapes],
    callback: [callback, setCallback]
    
}
}

export default ShapesAPI
