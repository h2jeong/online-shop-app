import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authUser } from "../_actions/user_action";

export default function(WrappedComponent, option, adminRoute = null) {
  const dispatch = useDispatch();
  function AuthenticationCheck(props) {
    // option - null : 아무나 출입 가능, true : 로그인 유저만, false: 로그인 유저 불가능
    // adminRoute - null, true, false
    // 가져온 상태를 가지고 분기 처리를 해준다.
    //   {
    //     user: req.user,
    //     isAdmin: req.user.role === 0 ? false : true,
    //     isAuth: true
    //   }
    useEffect(() => {
      dispatch(authUser())
        .then(res => {
          // console.log("res.payload:", res.payload);
          // 로그인 전
          if (!res.payload.isAuth) {
            if (option) {
              props.history.push("/login");
            }
            // 로그인 후
          } else {
            if (option) {
              if (adminRoute && !res.payload.isAdmin) {
                props.history.push("/");
              }
            } else if (option === false) {
              props.history.push("/");
            }
          }
        })
        .catch(err => {
          console.log("auth error:", err);
        });
    }, [props.history]);

    return <WrappedComponent {...props} />;
  }

  return AuthenticationCheck;
}
