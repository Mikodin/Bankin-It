import React, { Component, PropTypes } from 'react';
import { Button } from 'reactstrap';
import MdDelete from 'react-icons/lib/md/delete';
import MdAddBox from 'react-icons/lib/md/add-box';
import MdMinus from 'react-icons/lib/md/remove-circle-outline';


import ParentAccountCreator from './ParentAccountCreator';
import Account from '../Models/Account';
import SubAccountList from '../Containers/SubAccountList';
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
      collapsed: false,
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

  toggleCollapse = (event) => {
    event.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
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
    const { collapsed } = this.state;
    const { accountName, percentage, total, subAccounts } =
      this.state.mainAccount;

    const faStyle = {
      fontSize: '20px',
      marginRight: '2px',
    };

    return (
      <div className={`ParentAccount ${collapsed ? 'collapsed' : 'expanded'}`}>
        {accountName && !collapsed ?
          <div>
            <Button outline color="warning" onClick={this.toggleCollapse}>
              <MdMinus style={faStyle} />
              Collapse
            </Button>
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
          :
          <div>
            <p>{`${accountName} - Total ${total}`}
              <Button outline color="warning" onClick={this.toggleCollapse}>
                <MdAddBox style={faStyle} />
              </Button>
          </p>
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
          <ul><SubAccountList subAccounts={subAccounts} /> </ul>
        </div>

      </div>
    );
  }
}

export default ParentAccount;
