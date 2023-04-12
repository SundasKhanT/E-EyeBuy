import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [shape, setShape] = useState('');
  const [brand, setBrand] = useState('');
  const [search, setSearch] = useState('');
  const [result, setResult] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?${type}&${category}&${shape}&${brand}&${search}`);
      setProducts(res?.data?.products);
      setResult(res.data.result);
    }; 
    getProducts();
  }, [callback, type, category, shape, brand, search]);
  

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    type: [type, setType],
    category: [category, setCategory],
    shape: [shape, setShape],
    brand: [brand, setBrand],
    search: [search, setSearch],
    result: [result, setResult],
  };
};

export default ProductsAPI;
