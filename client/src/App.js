import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/Header/Header";
import Products from "./pages/products/Products";
import DetailProduct from "./pages/detailProduct/DetailProduct";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/utils/notFound/NotFound";
import Categories from "./pages/categories/Categories";
import Type from "./pages/types/Type";
import Shape from "./pages/shapes/Shapes";
import Brand from "./pages/brands/Brands";
import CreateProduct from "./pages/createProduct/CreateProduct";
import Checkout from "./pages/cart/Checkout";
import OrderHistory from "./pages/histroy/OrderHistory";
import OrderDetails from "./pages/histroy/OrderDetails";

const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/detail/:id" element={<DetailProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/category" element={<Categories />} />
              <Route path="/type" element={<Type />} />
              <Route path="/shape" element={<Shape />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/create_product" element={<CreateProduct />} />
              <Route path="/edit_product/:id" element={<CreateProduct />} />
              <Route path="/history" element={<OrderHistory />} />
              <Route path="/history/:id" element={<OrderDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
};

export default App;
