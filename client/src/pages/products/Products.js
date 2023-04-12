import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import "./Products.css";
import Filter from "./Filter";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state?.productAPI?.products || [];
  const [isAdmin] = state?.userAPI?.isAdmin||"";
  const [token] = state.token;
  const [callback, setCallback] = state?.productAPI?.callback||"";

  return (
    <>
      <Filter />

      <div className="products">
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            isAdmin={isAdmin}
            token={token}
            callback={callback}
            setCallback={setCallback}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
