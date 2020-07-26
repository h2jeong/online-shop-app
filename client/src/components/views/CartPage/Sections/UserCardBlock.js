import React from "react";
import { Button } from "antd";

function UserCardBlock(props) {
  const renderItems = () =>
    props.products &&
    props.products.length > 0 &&
    props.products.map((product, idx) => (
      <tr key={idx}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={`http://localhost:5000/${product.images[0]}`}
          />
        </td>
        <td>{product.quantity} EA</td>
        <td>$ {product.price} </td>
        <td>
          <Button onClick={() => props.onRemove(product._id)}>Remove</Button>
        </td>
      </tr>
    ));

  return (
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
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
