import React, { useEffect, useState } from "react";
import { Result, Empty } from "antd";
import { useDispatch } from "react-redux";
import { getCartItems, removeItem } from "../../../_actions/user_action";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    // state의 cart를 불러와서
    // db의 product 정보를 매치해서 업데이트 해준다.
    let cartItems = [];
    if (props.user.auth && props.user.auth.user.cart) {
      if (props.user.auth.user.cart.length > 0) {
        cartItems = props.user.auth.user.cart.map(cart => cart.id);
        dispatch(getCartItems(cartItems, props.user.auth.user.cart)).then(
          res => {
            if (res.payload.length > 0) {
              calculatateTotal(res.payload);
            }
          }
        );
      }
    }
  }, [props.user.auth]);

  // useEffect(() => {
  //   if (props.user.cartDetail && props.user.cartDetail.length > 0) {
  //     calculatateTotal(props.user.cartDetail);
  //   }
  // }, [props.user.cartDetail]);

  const calculatateTotal = products => {
    let total = 0;
    products.map(item => {
      return (total += parseInt(item.price, 10) * item.quantity);
    });
    setTotal(total);
  };

  const onRemove = productId => {
    dispatch(removeItem(productId));
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        {/* userInfo */}
        <UserCardBlock products={props.user.cartDetail} onRemove={onRemove} />

        <div style={{ marginTop: "3rem" }}>
          <h2>Total amount: ${Total}</h2>
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
