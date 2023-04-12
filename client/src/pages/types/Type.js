import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import "./Types.css";

const Type = () => {
  const state = useContext(GlobalState);
  const [types] = state.typesAPI.types;
  const [type, setType] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.typesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createType = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/type/${id}`,
          { name: type },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "Type updated Successfully");
      } else {
        const res = await axios.post(
          "/api/type",
          { name: type },
          {
            headers: { Authorization: token }
          }
        );
        alert(res.data.msg || "Type created successfully");
      }
      setOnEdit(false);
      setType("");
      setCallback(!callback);
    } catch (err) {
      const res = err.response;
      alert(res.data.msg || "Failed to update type"); // add alert for failed update
    }
  };

  const editType = async (id, name) => {
    setID(id);
    setType(name);
    setOnEdit(true);
  };

  const deleteType = async (id) => {
    try {
      const res = await axios.delete(`/api/type/${id}`, {
        headers: { Authorization: token }
      });
      alert("Type deleted successfully");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="types">
      <form onSubmit={createType}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          value={type}
          required
          onChange={(e) => setType(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {types.map((type) => (
          <div className="row" key={type._id}>
            <p>{type.name}</p>
            <button onClick={() => editType(type._id, type.name)}>Edit</button>
            <button onClick={() => deleteType(type._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Type;
