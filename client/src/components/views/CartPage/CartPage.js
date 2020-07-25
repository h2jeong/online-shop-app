import React, { useEffect, useState } from "react";
import { Result, Empty } from "antd";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_action";

function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // state의 cart를 불러와서
    // db의 product 정보를 매치해서 업데이트 해준다.
    let cartItems = [];
    if (props.user.auth && props.user.auth.user.cart) {
      if (props.user.auth.user.cart.length > 0) {
        cartItems = props.user.auth.user.cart.map(cart => cart.id);
        dispatch(getCartItems(cartItems, props.user.auth.user.cart));
      }
    }
  }, [props.user.auth, dispatch]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        {/* userInfo */}
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Quantity</th>
                <th>Product Price</th>
                <th>Remove from Cart</th>
              </tr>
            </thead>
            <tbody>
              {props.user.cartDetail &&
                props.user.cartDetail.product.map((cart, idx) => (
                  <tr key={idx}>
                    <td>
                      <img
                        style={{ width: "70px" }}
                        alt="product"
                        src={`http://localhost:5000/${cart.images[0]}`}
                      />
                    </td>
                    <td>{cart.quantity} EA</td>
                    <td>$ {cart.price} </td>
                    <td>
                      <button>Remove </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <h2>Total amount:</h2>
        </div>
        <Result status="success" title="Successfully Purchased Items" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <br />
          <Empty description={false} />
          <p>No Items In the Cart</p>
        </div>
      </div>

      {/* Paypal Button */}
    </div>
  );
}

export default CartPage;
