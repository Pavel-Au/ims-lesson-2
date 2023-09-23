import React, { Fragment } from "react";
import "./TableRow.css";

export const TableRow = ({ element, index, handleClick }) => (
  <Fragment>
    <tr className={element.active ? "active-row" : ""} onClick={handleClick}>
      <td>{index + 1}</td>
      <td>{element.type}</td>
      <td>{element.icon}</td>
    </tr>
  </Fragment>
);
