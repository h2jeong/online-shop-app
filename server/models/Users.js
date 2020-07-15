const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, maxLength: 50 },
  email: { type: String, unique: true },
  password: { type: String, minLenght: 5 },
  role: { type: Number, default: 0 },
  token: { type: String }
});

userSchema.pre("save", function(next) {
  // 몽구스 미들웨어(pre, post) - pre는 next를 인자로 사용
  // 새로 등록하거나 수정되었을 때만 only hash the password if it has been modified (or is new)
  // Document.prototype.isModified() - Returns true if this document was modified, else false.
  // 일부 속성이 수정되었는지 확인하려면 속성 이름을 isModified 함수에 매개 변수로 전달하십시오.

  const user = this;
  if (user.isModified("password")) {
    // 비밀번호 암호화 하기 :
    // 1. genrate a salt and hash on separate function calls
    // 2. store hash in db
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else next();
});

userSchema.methods.comparePassword = function(password, cb) {
  // 비밀번호 비교해서 결과 보내주기
  bcrypt.compare(password, this.password, function(err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
};

userSchema.methods.generateToken = function(cb) {
  const user = this;
  // 토큰 생성하여 db저장 후 유저 정보 보내주기
  jwt.sign({ _id: user._id.toHexString() }, "privateKey", function(err, token) {
    if (err) return cb(err);

    user.token = token;
    user.save((err, user) => {
      if (err) return cb(err);

      cb(null, user);
    });
  });
};

userSchema.statics.findByToken = function(token, cb) {
  jwt.verify(token, "privateKey", function(err, decoded) {
    // if (err) return cb(err);

    // why? mongoose async(promise) thing..
    User.findOne({ _id: decoded, token: token })
      .then(user => {
        cb(null, user);
      })
      .catch(err => cb(err));
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
