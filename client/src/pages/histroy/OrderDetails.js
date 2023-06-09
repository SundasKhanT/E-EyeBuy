import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const OrderDetails = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState({});

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (Object.keys(orderDetails).length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>Address</th>
            <th>Postal Code</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails?.name}</td>
            <td>
              {orderDetails?.address}
            </td>
            <td>{orderDetails?.postalCode}</td>
            <td>{orderDetails?.city}</td>
            <td>{orderDetails.status}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin:"30px 0px"}}>
      <thead>
        <tr>
          <th></th>
          <th>Products</th>
          <th>Qunatity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {
          orderDetails.cart.map(item =>(
            <tr key={item._id}>
              <td><img src={item.images.url} alt=""></img></td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.price* item.quantity}</td>
              <td>{item.status}</td>

          
              
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
