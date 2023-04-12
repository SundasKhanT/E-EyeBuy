import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import "./Shapes.css";

const Shapes = () => {
  const state = useContext(GlobalState);
  const [shapes] = state.shapesAPI.shapes;
  const [shape, setShape] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.shapesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createShape = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/shape/${id}`,
          {
            name: shape
          },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "Shape updated successfully");
      } else {
        const res = await axios.post(
          "/api/shape",
          {
            name: shape
          },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "shape created successfully");
      }
      setOnEdit(false);
      setShape("");
      setCallback(!callback);
    } catch (err) {
      const res = err.response;
      alert(res.data.msg || "Shape Updated successfully");
    }
  };

  const editShape = async (id, name) => {
    setID(id);
    setShape(name);
    setOnEdit(true);
  };

  const deleteShape = async (id) => {
    try {
      const res = await axios.delete(`/api/shape/${id}`, {
        headers: { Authorization: token }
      });
      alert("Shape deleted successfully");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="shapes">
      <form onSubmit={createShape}>
        <label htmlFor="shapes">Shape</label>
        <input
          type="text"
          name="shape"
          value={shape}
          required
          onChange={(e) => setShape(e.target.value)}
        />
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {shapes.map((shape) => (
          <div className="row" key={shape._id}>
            <p>{shape.name}</p>
            <button onClick={() => editShape(shape._id, shape.name)}>
              Edit
            </button>
            <button onClick={() => deleteShape(shape._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shapes;
