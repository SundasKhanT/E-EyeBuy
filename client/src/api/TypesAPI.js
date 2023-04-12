import {useState, useEffect} from 'react'
import axios from 'axios'

const TypesAPI = () => {
      const [types, setTypes] = useState([])
       const[callback, setCallback] = useState(false)

    useEffect(()=>{
        const getTypes = async () =>{
            const res = await axios.get('/api/type')
            setTypes(res.data)
        }

        getTypes()
    }, [])

    return{
        types: [types, setTypes],
        callback: [callback, setCallback]
    }
}


export default TypesAPI
