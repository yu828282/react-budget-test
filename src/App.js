import { useState } from "react";
import './App.css';
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert"; 

const App = () => {

  const [charge, setCharge] = useState("");
  const [id, setId] = useState('');
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false); //수정버튼 클릭 시 변경 및 해당항목 정보 가져오기
  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState([
    { id: 1, charge: "월세", amount: '1,000,000' },
    { id: 2, charge: "교통비", amount: '50,000' },
    { id: 3, charge: "식비", amount: '250,000' },
  ])

  const handleCharge = (e) => {
    // console.log(e.target.value);
    setCharge(e.target.value);
  }
  const handleAmount = (e) => {
    // console.log(e.target.valueAsNumber); 
    // setAmount(e.target.valueAsNumber);//string -> number 형태로 변환
    if ((Number(e.target.value.replaceAll(',', '')))){
      setAmount(e.target.value.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }else{      
      handleAlert({type: 'danger',text: '정확한 숫자를 입력해주세요.'})
      setAmount(''); 
    }
  }

  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpense);
    handleAlert({ type: "success", text: "항목이 삭제되었습니다." });
  } 
  const handleSubmit = (e) => {
    e.preventDefault(); //빈칸제출 제한
    if (charge !== "" && amount !== "") {
      if(edit){
        const newExpenses = expenses.map(item => {
          // return item.id === id ? {...item, charge : charge, amount : amount} : item
          return item.id === id ? {...item, charge, amount} : item //원래 것에 덮어 씌우기
        })
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({type : 'success', text : '항목이 수정되었습니다.'})
      }else{
        const newExpense = {id : crypto.randomUUID(), charge, amount}
        const newExpenses = [...expenses, newExpense] //불변성을 지키기 위해 새 expenses 생성
        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "항목이 생성되었습니다." });
      }
    }else{
      handleAlert({
        type: 'danger',
        text: '항목은 빈 값일 수 없으며 비용은 0원 보다 커야 합니다.'
      })
    }
    setCharge('');
    setAmount('');
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => { setAlert({ show: false }); }, 7000);
  }
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }
  const clearItems = () => {
    setExpenses([]);
  }

    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산 계산기</h1>
        <div style={{width : '100%', backgroundColor : 'white', padding : '10px', borderRadius : '5px'}}>
          <ExpenseForm handleCharge = {handleCharge} charge= {charge} amount={amount} handleAmount = {handleAmount} handleSubmit = {handleSubmit} edit={edit} ></ExpenseForm>
        </div>
        <div style={{width : '100%', backgroundColor : 'white', padding : '10px', margin : '20px 0', borderRadius : '5px'}}>
          <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}></ExpenseList>
        </div>
        <div style={{display : 'flex', justifyContent : 'end', marginTop : '10px'}}>
          <p style={{fontSize: '25px'}}>
            {/* 총 지출 : <span> {expenses.reduce((acc, curr) => {return (acc += curr.amount);}, 0)}원</span> */}
            총 지출 : <span>{expenses.reduce((acc, curr) => {return (acc += Number(curr.amount.replaceAll(',', '')));}, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
          </p>
        </div>
      </main>
    )
  } 

export default App;