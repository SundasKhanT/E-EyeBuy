import React,{useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import './Filter.css'

const Filter = () => {
  const state = useContext(GlobalState)
  const [categories] = state?.categoriesAPI?.categories || []
  const [category, setCategory] = state?.productAPI?.category || ''
  const [types] = state?.typesAPI?.types || []
  const [type, setType] = state?.productAPI?.type || ''
  const [shapes] = state?.shapesAPI?.shapes || []
  const [shape, setShape] = state?.productAPI?.shape || ''
  const [brands] = state?.brandsAPI?.brands || []
  const [brand, setBrand] = state?.productAPI?.brand || ''
  const [products] = state?.productAPI?.products || []
  const [filteredProducts, setFilteredProducts] = useState([])

  
  const handleType = (e) => {
    setType(e.target.value);
    const filtered = products.filter(product => {
      return product.type === e.target.value;
    });
    setFilteredProducts(filtered);
  }
  
  const handleCategory = (e) => {
    setCategory(e.target.value);
    const filtered = products.filter(product => {
      return product.category === e.target.value;
    });
    setFilteredProducts(filtered);
  }
  
  const handleShape = (e) => {
    setShape(e.target.value);
    const filtered = products.filter(product => {
      return product.shape === e.target.value;
    });
    setFilteredProducts(filtered)
  }
  
  const handleBrand = (e) => {
    setBrand(e.target.value);
    const filtered = products.filter(product => {
      return product.brand === e.target.value;
    });
    setFilteredProducts(filtered);
  }
  

  return (
    <div className='filter_menu'>
        <span>Shop by Type:</span>
        <select name='type' value={type} onChange={handleType}>
          <option value="">All Products</option>
          {
            types?.map(type => (
              <option value={"type=" + type.name}
              key={type.name}>
                {type.name}
              </option>
            ))
          }
        </select>
          
      
        <span>Shop by Category:</span>
        <select name='category' value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {
            categories?.map(category => (
              <option value={"category=" + category.name}
              key={category.name}>
                {category.name}
              </option>
            ))
          }
        </select>

        <span>Shop by Shape:</span>
        <select name='shape' value={shape} onChange={handleShape}>
          <option value="">All Products</option>
          {
            shapes?.map(shape => (
              <option value={"shape=" + shape.name}
              key={shape.name}>
                {shape.name}
              </option>
            ))
          }
        </select>

        <span>Shop by Brand:</span>
        <select name='brand' value={brand} onChange={handleBrand}>
          <option value="">All Products</option>
          {
            brands?.map(brand => (
              <option value={"brand=" + brand.name}
              key={brand.name}>
                {brand.name}
              </option>
            ))
          }
        </select>
    </div>
  )
}

export default Filter
