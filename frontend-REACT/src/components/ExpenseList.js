import React from "react"
import Expense from "./Expense"

const ExpenseList = ({expList, ondelete}) => {
  return (
    <ul className="list-none p-0 m-0">
      {expList.map((expense) => (
        <Expense
          key={expense.id}
          id={expense.id}
          expense={expense}
          ondelete={ondelete}
        />
      ))}
    </ul>
  )
}

export default ExpenseList