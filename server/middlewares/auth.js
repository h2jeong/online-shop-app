const { User } = require("../models/Users");

let auth = (req, res, next) => {
  // console.log("mid auth cookie", req.cookies);
  // 쿠키에 저장된 토큰 확인
  let token = req.cookies.w_auth;

  // 유저를 찾는 것 뿐 아니라 로그인 상태인지를 처리해줘야 한다.
  User.findByToken(token, (err, user) => {
    // if (err) return next(err);
    if (err) throw err;
    if (!user) {
      return res.json({
        isAuth: false,
        message: "Authenticated User does not exist"
      });
    }
    // console.log("mid auth user", user);
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
