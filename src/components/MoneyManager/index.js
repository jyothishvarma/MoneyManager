import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += parseInt(eachTransaction.amount)
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += parseInt(eachTransaction.amount)
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += parseInt(eachTransaction.amount)
      } else {
        expensesAmount += parseInt(eachTransaction.amount)
      }
    })

    balanceAmount += incomeAmount - expensesAmount
    return balanceAmount
  }

  deleteHistory = id => {
    const {transactionsList} = this.state
    const filteredHistory = transactionsList.filter(each => each.id !== id)
    this.setState({transactionsList: filteredHistory})
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state

    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="money-manager-container">
            <div className="user-details-container">
              <h1 className="hi-heading">Hi, Richard</h1>
              <p className="user-text">
                Welcome back to your
                <span className="app-name"> Money Manager</span>
              </p>
            </div>
            <div>
              <MoneyDetails
                incomeAmount={incomeAmount}
                expensesAmount={expensesAmount}
                balanceAmount={balanceAmount}
              />
            </div>
            <div className="transactions-and-history-container">
              <div className="transaction-container">
                <h1 className="transaction-head">Add Transaction</h1>
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  <label className="label-el" htmlFor="title-input">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="input-el"
                    id="title-input"
                    placeholder="TITLE"
                    value={titleInput}
                    onChange={this.onChangeTitle}
                  />
                  <label className="label-el" htmlFor="amount-input">
                    AMOUNT
                  </label>
                  <input
                    type="text"
                    placeholder="AMOUNT"
                    className="input-el"
                    id="amount-input"
                    value={amountInput}
                    onChange={this.onChangeAmount}
                  />
                  <label className="label-el" htmlFor="type-input">
                    TYPE
                  </label>
                  <select
                    className="type-input"
                    id="type-input"
                    onChange={this.onChangeOption}
                    value={optionId}
                  >
                    {transactionTypeOptions.map(each => (
                      <option
                        className="option"
                        key={each.optionId}
                        value={each.optionId}
                      >
                        {each.displayText}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </form>
              </div>
              <ul className="history-container">
                <h1 className="history-head">History</h1>
                <div className="history-details-heading">
                  <p className="history-name">Title</p>
                  <p className="history-name">Amount</p>
                  <p className="history-name">Type</p>
                  <p> </p>
                </div>
                {transactionsList.map(each => (
                  <TransactionItem
                    key={each.id}
                    transactionDetails={each}
                    deleteHistory={this.deleteHistory}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
