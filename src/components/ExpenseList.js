import React from "react";
import './ExpenseList.css'
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
      // console.log(props.expenses)
    return(
      <>
        <ul className="list">
          {props.expenses.map(expense => {
            return(<ExpenseItem expense={expense} key={expense.id} handleDelete = {props.handleDelete} handleEdit= {props.handleEdit}></ExpenseItem>)
          })}          
        </ul>
        {props.expenses.length > 0 && (
          <button className="btn" onClick={props.clearItems}>모두 지우기</button>
        )}        
      </>
    )
  }
export default ExpenseList;