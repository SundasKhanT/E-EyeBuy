import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./Categories.css";
import axios from "axios";

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("")
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category, description },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "Category updated successfully"); // add alert for successful update
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category, description },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "Category created successfully");
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      const res = err.response;
      alert(res.data.msg || "Failed to update category"); // add alert for failed update
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token }
      });
      alert("Category deleted successfully");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htlmlfor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p> {category.description}</p>
            <p>{category.name}</p>

            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
