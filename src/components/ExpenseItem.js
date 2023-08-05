import React from "react";
import './ExpenseItem.css';
import { FaFilePen, FaTrash } from "react-icons/fa6";

const ExpenseItem  = ({expense, handleDelete, handleEdit}) => {
    return(
      <li className="item">
        <div className="info">
            <span className="expense">{expense.charge}</span>
            <span className="amount">{expense.amount}원</span>
        </div>
        <div className="btn-wrap">
          <button className="edit-btn" onClick={() => handleEdit(expense.id)}><FaFilePen></FaFilePen>수정</button>
          <button className="clear-btn" onClick={() => handleDelete(expense.id)}><FaTrash></FaTrash>삭제</button>
        </div>
      </li>
    )
}
export default ExpenseItem;