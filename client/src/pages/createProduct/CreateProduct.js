import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./CreateProduct.css";

const initialState = {
  product_id: "",
  title: "",
  price: '000',
  description: "description",
  category: "",
  _id:""
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [types] = state.typesAPI.types;
  const [shapes]= state.shapesAPI.shapes;
  const [brands]= state.brandsAPI.brands;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate()
  const param = useParams()


  const [products]= state.productAPI.products
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = state.productAPI.callback


  useEffect(()=>{
    if(param.id){
      setOnEdit(true)
      products.forEach(product =>{
        if(product._id === param.id){
         setProduct(product)
         setImages(product.images)
        }
      })
      setOnEdit(true)

    }
  },[param.id, products])

 
  const handleUpload = async e => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not admin");
      const file = e.target.files[0];

      console.log(file)

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("size too large!");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      )
        return alert("File format is incorrect");

      let formData = new FormData();
      formData.append("file", file);


      const res = await axios.post("http://localhost:3000/api/upload", formData, {
  headers: { "content-type": "multipart/form-data", Authorization: token }
});


      setLoading(false);
      setImages(res?.data)
        
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };


  const handleDestroy= async e =>{
    try{
      if(!isAdmin) return alert ("You'r not an admin")
      await axios.post('/api/destroy', {public_id: images.public_id},{
      headers: {'Authorization': token}
    })
    setImages(false)
    }catch(err){
      alert(err.response?.data?.msg);
    }
  }


  const handleInputChange = async e =>{
    const {name,value} = e.target
      setProduct({...product, [name]:value})
  }


  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      if(!isAdmin)return alert("you're not an admin")
      if(!images) return alert("No Image is upladed")

      if(onEdit){
        await axios.put(`/api/products/${product._id}`,{...product, images},{
          headers:{Authorization: token}
        })
        alert("Product updated successfully")
      }else{
        await axios.post('/api/products',{...product, images},{
          headers:{Authorization: token}
        })
        alert("Product created successfully")
      }
      
      setCallback(!callback)
      navigate('/')
    }catch(err){
      alert(err.response?.data?.msg)
    }
  }


  const stylesUpload = {
    display: images ? "block" : "none"
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input
          type="file"
          name="file"
          id="file_upload"
          onChange={handleUpload}
        />
        { loading ? <div id="file_img"></div>
        :<div id="file_img" style={stylesUpload}>
          <img src={images ? images.url : ''} alt="" />
          <span onClick={handleDestroy}>X</span>
        </div>
}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id} onChange = {handleInputChange} disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title} onChange = {handleInputChange}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price} onChange = {handleInputChange}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description} onChange = {handleInputChange}
            rows="5"
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content} onChange = {handleInputChange}
            rows="7"
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories:</label>
          <select name="category" value={product.category} onChange = {handleInputChange}>
            <option value="">Please select a category</option>
            {categories.map(category =>
              <option>
                {category.name}
              </option>
            )}
          </select>
        </div>


        <div className="row">
          <label htmlFor="types">Types</label>
          <select name="type" value={products.type} onChange = {handleInputChange}>
          <option value="">Please Select a type</option>
          {types.map(type =>
            <option>{type.name}</option>)}
            </select>
        </div>

        <div className="row">
          <label htmlfor="shapes">Shapes</label>
          <select name="shape" value={products.shape} onChange={handleInputChange}>
            <option value="">Please Select a shape</option>
            {shapes.map(shape => 
            <option >{shape.name}</option>)}
          </select>
        </div>

        <div className="row">
          <label htmlfor = "brands">Brands</label>
          <select name="brand" value={products.brand} onChange={handleInputChange}>
            <option value="">Please Select a brand</option>
            {brands.map(brand => 
            <option >{brand.name}</option>)}
          </select>
          
        </div>

        <button type="submit">{onEdit ? 'update': 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
