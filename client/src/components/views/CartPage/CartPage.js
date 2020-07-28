import React, { useEffect, useState } from "react";
import { Result, Empty, message } from "antd";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from "../../../_actions/user_action";
import UserCardBlock from "./Sections/UserCardBlock";
import { withRouter } from "react-router-dom";
import PayPal from "../../utils/PayPal";
import Axios from "axios";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // state의 cart를 불러와서
    // db의 product 정보를 매치해서 업데이트 해준다.
    console.log(props.user.auth);
    let cartItems = [];
    if (props.user.auth && props.user.auth.cart) {
      if (props.user.auth.cart.length > 0) {
        cartItems = props.user.auth.cart.map(cart => cart.id);
        dispatch(getCartItems(cartItems, props.user.auth.cart)).then(res => {
          if (res.payload.length > 0) {
            calculatateTotal(res.payload);
          }
        });
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
    setShowTotal(true);
  };

  const onRemove = productId => {
    dispatch(removeCartItem(productId)).then(res => {
      if (res.payload.cartDetail.length <= 0) {
        // redux problem - too slow
        setShowTotal(false);
      } else {
        calculatateTotal(res.payload.cartDetail);
      }
    });
  };

  const transactionSuccess = data => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data
    };

    Axios.post("/api/users/successBuy", variables).then(res => {
      if (res.data.success) {
        setShowSuccess(true);
        setShowTotal(false);

        dispatch(
          onSuccessBuy({ cart: res.data.cart, cartDetal: res.data.cartDetal })
        );
      } else {
        message.error("Failed to buy it");
      }
    });
  };

  const transactionError = () => {
    console.log("Paypal error");
  };

  const transactionCanceled = () => {
    console.log("transaction Canceled");
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        {/* userInfo */}
        <UserCardBlock products={props.user.cartDetail} onRemove={onRemove} />

        {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amount: ${Total}</h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
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
        )}
      </div>

      {/* Paypal Button */}
      {!ShowSuccess && (
        <PayPal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      )}
    </div>
  );
}

export default withRouter(CartPage);
