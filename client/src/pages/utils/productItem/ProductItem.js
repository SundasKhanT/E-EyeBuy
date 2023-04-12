import React from 'react';
import './ProductItem.css';
import BtnRender from './BtnRender';
import axios from 'axios';

const ProductItem = ({ product, isAdmin, token, callback, setCallback}) => {

  const deleteProduct  = async() =>{
    try{
      const destroyImg = axios.post('./api/destroy',{public_id: product.images.public_id},{
        headers:{Authorization:token}
      })
      const deleteProduct = axios.delete(`./api/products/${product._id}`,{
        headers:{Authorization:token}
      })
      
      await destroyImg
      await deleteProduct
      setCallback(!callback)
      alert('Product deleted successfully')
    }catch(err){
      alert(err?.res?.data?.msg)
    }
  }


  const handleCheck = async() => {
    product.checked = product.checked
  }


  return (
    <div className="product_card">
      {
        isAdmin && <input type='checkbox' checked={product.checked} onChange={handleCheck}/>
      }
      <img src={product.images?.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>Rs{product.price}</span> 
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct}/>
    </div>
  );
};

export default ProductItem; 