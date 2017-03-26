import React, { Component, PropTypes } from 'react';
import { Button } from 'reactstrap';
import MdDelete from 'react-icons/lib/md/delete';
import MdAddBox from 'react-icons/lib/md/add-box';


import ParentAccountCreator from './ParentAccountCreator';
import Account from '../Models/Account';
import './ParentAccount.css';

class ParentAccount extends Component {
  static propTypes = {
    parentAccount: PropTypes.instanceOf(Account),
    deleteAccount: PropTypes.func,
  }

  static defaultProps = {
    parentAccount: {},
    deleteAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      mainAccount: new Account('', 0, 0),
      showCreator: false,
    };
  }

  componentDidMount() {
    this.setAccountFromProps();
  }

  setAccountFromProps() {
    this.setState({ mainAccount: this.props.parentAccount });
  }

  handleAddToChildAccounts = (account) => {
    const mainAccount = this.state.mainAccount;
    const childAccounts = this.state.mainAccount.subAccounts.slice();
    childAccounts.push(account);

    mainAccount.subAccounts = childAccounts;

    this.setState({ mainAccount });
    this.setState({ showCreator: !this.state.showCreator });
  }

  toggleShowCreator = (event) => {
    event.preventDefault();
    this.setState({ showCreator: !this.state.showCreator });
  }

  deleteAccount = () => {
    this.props.deleteAccount ?
      this.props.deleteAccount(this.state.mainAccount)
      :
      this.setState({ mainAccount: {} });
  }

  handlePercentageSubtraction(amount) {
    const newPercentage = this.state.mainAccount.percentage - amount;
    const mainAccount = this.state.mainAccount;
    mainAccount.percentage = newPercentage;

    this.setState({ mainAccount });
  }

  render() {
    const { accountName, percentage, total, subAccounts } =
      this.state.mainAccount;

    const faStyle = {
      fontSize: '20px',
      marginRight: '2px',
    };

    return (
      <div className="parentAccount">
        {accountName &&
          <div>
            <p>Account name: {accountName}</p>
            <p>Percentage: {percentage}</p>
            <p>Total: {total }</p>
            <Button outline color="danger" onClick={this.deleteAccount}>
              <MdDelete style={faStyle} />
              Remove
            </Button>
            <Button color="primary" onClick={this.toggleShowCreator}>
              <MdAddBox style={faStyle} />
              Add Child
            </Button>
          </div>
        }


        {
          this.state.showCreator
          ?
          <div>
            <ParentAccountCreator
              incomeAfterBills={total}
              percentage={percentage}
              addToParentAccounts={this.handleAddToChildAccounts}
            />
          </div>
          :
          <div />
        }

        <div>
          <ul><AccountList subAccounts={subAccounts} /> </ul>
        </div>

      </div>
    );
  }
}

export default ParentAccount;

function AccountList(props) {
  const accounts = props.subAccounts;
  const accountListItems = accounts.map((account) =>
      <li key={account.accountName}>
        <ParentAccount parentAccount={account} />
      </li>,
  );

  return (
    <div>
      <ul>{accountListItems}</ul>
    </div>
  );
}

AccountList.propTypes = {
  subAccounts: PropTypes.arrayOf(PropTypes.instanceOf(Account)),
};

AccountList.defaultProps = {
  subAccounts: [],
};
