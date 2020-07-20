import React, { useEffect } from "react";
import { Result, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { getCartItems } from "../../../_actions/user_action";

function CartPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user);
  useEffect(() => {}, []);

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
              {/* {user.auth &&
                user.auth.user.cart.map((cart, idx) => ( */}
              <tr>
                <td>
                  <img style={{ width: "70px" }} alt="product" src />
                </td>
                <td>quantity EA</td>
                <td>$ price </td>
                <td>
                  <button onClick>Remove </button>{" "}
                </td>
              </tr>
              {/* ))} */}
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
