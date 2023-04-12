import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./Brands.css";
import axios from "axios";

const Brands = () => {
  const state = useContext(GlobalState);
  const [brands] = state.brandsAPI.brands;
  const [brand, setBrand] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.brandsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/brand/${id}`,
          { name: brand },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "brand updated successfully"); // add alert for successful update
      } else {
        const res = await axios.post(
          "/api/brand",
          { name: brand },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "brand created successfully");
      }
      setOnEdit(false);
      setBrand("");
      setCallback(!callback);
    } catch (err) {
      const res = err.response;
      alert(res.data.msg || "Failed to update brand"); // add alert for failed update
    }
  };

  const editBrand = async (id, name) => {
    setID(id);
    setBrand(name);
    setOnEdit(true);
  };

  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(`/api/brand/${id}`, {
        headers: { Authorization: token }
      });
      alert("Brand deleted successfully");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="brands">
      <form onSubmit={createBrand}>
        <label htlmlfor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          value={brand}
          required
          onChange={(e) => setBrand(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {brands.map((brand) => (
          <div className="row" key={brand._id}>
            <p>{brand.name}</p>
            <div>
              <button onClick={() => editBrand(brand._id, brand.name)}>
                Edit
              </button>
              <button onClick={() => deleteBrand(brand._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
