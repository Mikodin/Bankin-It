import React, { Component } from 'react';
import ParentAccountCreator from './ParentAccountCreator.jsx';
import Account from '../Models/Account.js';
import { Button } from 'reactstrap';
import './ParentAccount.css';

class ParentAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainAccount: new Account('', 0, 0),
      showCreator: false,
    }
  }

  componentDidMount() {
    this.setState({mainAccount: this.props.parentAccount});
  }

  handleAddToChildAccounts = (account) => {
    var mainAccount = this.state.mainAccount;
    var childAccounts = this.state.mainAccount.subAccounts.slice();
    childAccounts.push(account);

    mainAccount.subAccounts = childAccounts;

    this.setState({mainAccount: mainAccount});
  }

  toggleShowCreator = () => {
    this.setState({showCreator: !this.state.showCreator})
  }


  handlePercentageSubtraction(amount) {
    var newPercentage = this.state.mainAccount.percentage - amount;
    var mainAccount = this.state.mainAccount;
    mainAccount.percentage = newPercentage;

    this.setState({mainAccount: mainAccount})
  }

  render() {
    const {accountName, percentage, total, subAccounts} = this.state.mainAccount;

    return (
      <div className='parentAccount'>
        <div>
          <p>Account name: {accountName}</p>
          <p>Percentage: {percentage}</p>
          <p>Total: {total }</p>
          <Button color='primary' onClick={this.toggleShowCreator}>Add Child Account</Button>
        </div>

        { 
          this.state.showCreator
          ? <div>
            <ParentAccountCreator
              incomeAfterBills={total} 
              percentage={percentage} 
              addToParentAccounts={this.handleAddToChildAccounts}
            />
          </div>
          : <div></div>
        }

        <div> 
          <ul><AccountList subAccounts={subAccounts} /> </ul>
        </div>

      </div>
    )
  }
}

export default ParentAccount;

function AccountList(props) {
  const accounts = props.subAccounts;
  const accountListItems = accounts.map((account) => 
      <li key={account.accountName}>
        <ParentAccount parentAccount={account} />
      </li>
  );

  return (
    <div>
      <ul>{accountListItems}</ul>
    </div>
  )
}

