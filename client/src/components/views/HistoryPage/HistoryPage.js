import React from "react";

function HistoryPage() {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>price</td>
            <td>quantity</td>
            <td>dateOfPurchase</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
