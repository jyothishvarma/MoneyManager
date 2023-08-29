// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteHistory} = props
  const {id, title, amount, type} = transactionDetails

  const onDelete = () => {
    deleteHistory(id)
  }

  return (
    <li className="history-item-container">
      <p className="history-item">{title}</p>
      <p className="history-item">{amount}</p>
      <p className="history-item">{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testId="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default TransactionItem
