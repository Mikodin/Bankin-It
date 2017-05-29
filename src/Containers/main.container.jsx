/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Icon } from 'semantic-ui-react';

import HeaderContainer from './header.container';
import MonthliesContainer from './monthlies.container';
import AccountsContainer from './accounts.container';

class MainContainer extends Component {
  static propTypes = {
    fetchingData: PropTypes.bool,
  }

  static defaultProps = {
    fetchingData: false,
  }
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    const header =
      (
        <Header as="h1" icon>
          <Icon name="money" />
          Bankin-It
          <Header.Subheader>
            The sum is more than just the parts of the whole
          </Header.Subheader>
          <Header.Subheader>
            Or some other cheesy quote
          </Header.Subheader>
        </Header>
      );

    const body =
      this.props.fetchingData
        ?
        <h1> Loading...</h1>
        :
        (<div>
            <MonthliesContainer />
            <AccountsContainer />
          </div>);

    return (
      <div>
        <HeaderContainer />
        <Container style={{ paddingTop: '50px' }}>
          {header}
          { body }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingData: state.firebaseReducer.fetchingData,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MainContainer);
