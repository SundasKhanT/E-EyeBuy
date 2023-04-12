import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import './OrderHistory.css'

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;

  return ( 
    <div className="history-page">
      <h2>History</h2>

      <h4> you have {history.length} ordered</h4>

      <div>
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User ID</th>
              <th>Date of Purchased</th>
              <th>Status</th>
              <th></th>
            </tr> 
          </thead>
          <tbody>
            {history.map(items  => (
              <tr key={items._id}>
                <td>{items.name}</td>
                <td>{items.email}</td>
                <td>{items.user_id}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>{items.status}</td>
                <td>
                  
                  <Link to={`/history/${items._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
