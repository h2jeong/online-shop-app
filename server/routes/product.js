const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/auth");
const { Product } = require("../models/Product");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".gif") {
      return cb(res.status(400).end("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

let upload = multer({ storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  // after getting that image from client we need to save it inside node server
  // Multer library
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.finename
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  // save all the data we got from the client into the DB
  console.log("req.body:", req.body);
  const product = new Product(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.serchTerm;
  let findArgs = {};
  // console.log(req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  // console.log(findArgs);
  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

// ?id=${productId}&type=single
// type=array id=12321323,12323214,12340909
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;
  console.log(productIds, type);
  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map(item => item);
  }

  // we need to find the product information that belong to product id
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      // console.log(product);
      res.status(200).json({ success: true, product });
    });
});

module.exports = router;
