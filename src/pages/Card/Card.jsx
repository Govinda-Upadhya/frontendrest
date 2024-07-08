import React, { useContext, useState } from "react";
import "./Card.css";
import { StoreContext } from "../../components/context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Card = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount } =
    useContext(StoreContext);
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleProceedToOrder = async () => {
    if (tableNumber && phoneNumber && getTotalAmount() > 0) {
      // Generate a 5 character long alphanumeric unique ID
      const orderId = Math.random().toString(36).substring(2, 7).toUpperCase();

      const items = Object.keys(cartItems).map((itemId) => ({
        id: itemId,
        quantity: cartItems[itemId],
      }));

      const orderData = {
        id: orderId,
        table_number: tableNumber,
        phone_number: phoneNumber,
        items: items,
      };

      try {
        const response = await axios.post(
          "https://16.171.161.210/place_order",
          orderData
        );
        console.log(response.data);
        toast.success(
          `Order is successfully placed. Your Order ID is ${orderId}`
        );
      } catch (error) {
        console.error(
          "Error placing order:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to place your order. Please try again.");
      }
    } else {
      toast.error(
        "Fail to place your order. Please enter valid table number, phone number, and ensure your cart is not empty."
      );
    }
  };

  return (
    <div className="cart">
      <ToastContainer />
      <div className="cart-items">
        <div className="cart-items-titles">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id}>
                <div className="cart-items-titles cart-items-item">
                  <img src={`https://16.171.161.210${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>Nu.{item.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>Nu.{item.price * cartItems[item.id]}</p>
                  <p onClick={() => removeFromCart(item.id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Your Orders</h2>
          <div>
            <div className="user-details">
              <div className="details">
                <p>Table Number</p>
                <input
                  type="number"
                  className="input-number"
                  placeholder="Table No"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />
              </div>
              <div className="details">
                <p>Phone Number</p>
                <input
                  type="number"
                  className="input-number"
                  placeholder="Phone No"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total : </b>
              <b> Nu.{getTotalAmount()} /-</b>
            </div>
          </div>
          <button
            type="submit"
            className="proceed-to-order"
            onClick={handleProceedToOrder}
          >
            Proceed To Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
