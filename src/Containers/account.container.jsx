/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { Button, Modal, Header, Icon, Card } from 'semantic-ui-react';

import { deleteAccount, modifyAccount } from '../Actions/account.actions';
import { fbDeleteAccount } from '../Actions/firebase.actions';

import AccountList from '../Components/accountList.component';
import AccountCreator from '../Containers/accountCreator.container';

class AccountContainer extends Component {
  static propTypes = {
    account: PropTypes.object,
    deleteAccount: PropTypes.func,
  }

  static defaultProps = {
    account: {},
    deleteAccount: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      showCreator: false,
      modalOpen: false,
      showChildren: true,
      expanderIcon: 'minus',
    };

    this.collapse = this.collapse.bind(this);
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  });

  handleClose = (e) => this.setState({
    modalOpen: false,
  });

  toggleCreator = () => {
    const icon = this.state.expanderIcon === 'minus'
      ? 'maximize'
      : 'minus';
    this.setState({
      showCreator: !this.state.showCreator,
      expanderIcon: icon,
    });
  }

  collapse() {
    const account = this.props.account;
    this.setState({ showChildren: !this.state.showChildren });
    const queryInput =
      document.querySelector(`button[name='collapse-${account.id}']`);
    queryInput.blur();
  }

  componentDidMount() {
  }

  removeAccount = (account) => {
    this.props.deleteAccount(account.id);
    if (this.props.uid) this.props.fbDeleteAccount(this.props.uid, account.fbKey);
  };

  render() {
    const { account } = this.props;
    const modal = (<Modal
      dimmer={'inverted'}
      trigger={
        <Button primary animated="vertical" onClick={this.handleOpen}>
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="plus" />
          </Button.Content>
        </Button>
      }
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size="small"
    >
      <Header
        icon="browser"
        content={`Add Child Account(s) to ${account.name}`}
      />
      <Modal.Content>
        <AccountCreator
          isModal
          parentAccount={account}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={this.handleClose} inverted>
          <Icon name="checkmark" /> Done
          </Button>
      </Modal.Actions>
    </Modal>);

    return (
      <Card color="olive" fluid>
        <Card.Content>
          <Card.Header>
            Name: {account.name}
          </Card.Header>
          <p>Amount: {account.amount}</p>
          <Button
            color="red"
            animated="vertical"
            onClick={() => this.removeAccount(account)}>
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name="trash" />
            </Button.Content>
          </Button>
          {modal}
          {
            account.childAccounts.length > 0
              ? (<Button
                secondary
                name={`collapse-${account.id}`}
                animated="vertical"
                onClick={this.collapse}>
                <Button.Content hidden>{
                  this.state.showChildren
                    ? 'Collapse' : 'Expand'}
                </Button.Content>
                <Button.Content visible>
                  <Icon name={this.state.showChildren ? 'minus' : 'maximize'} />
                </Button.Content>
              </Button>
              )
              : undefined
          }
          {
            this.state.showChildren
              ? (
                <AccountList
                  accounts={account.childAccounts}
                  deleteAccount={this.props.deleteAccount}
                />
              )
              : undefined
          }
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.userReducer.accounts,
    uid: state.firebaseReducer.user.uid,
  };
};

const mapDispatchToProps = {
  deleteAccount,
  fbDeleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
