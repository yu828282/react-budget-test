import React from "react";
import './ExpenseForm.css'; 

const ExpenseForm = ({handleCharge, charge, amount, handleAmount, handleSubmit, edit}) => {
    return(
      <form onSubmit={handleSubmit}>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="charge">지출 항목</label>
            <input type="text" className="form-control" id="charge" name="charge" placeholder="예) 렌트비" value={charge} onChange={handleCharge}/>
          </div>
          <div className="form-group">
            <label htmlFor="charge">비용(원)</label>
            <input type="number" className="form-control" id="amount" name="amount" placeholder="예) 100" value={amount} onChange={handleAmount}/>
          </div>
        </div>
        <button type="submit" className="btn">{edit? '수정하기' : '제출하기'}</button>
      </form>
    )
}
export default ExpenseForm;