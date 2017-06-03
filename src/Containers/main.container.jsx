/* eslint jsx-a11y/img-has-alt: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Icon,
  Dimmer,
  Loader,
  Segment 
} from 'semantic-ui-react';

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
    return (
      <div>
        <HeaderContainer />
        <Container style={{ paddingTop: '50px' }}>
          <Dimmer.Dimmable  dimmed={this.props.fetchingData}>
            <Dimmer active={this.props.fetchingData} inverted>
              <Loader>Fetching your Stache...</Loader>
            </Dimmer>
            <MonthliesContainer />
            <AccountsContainer />
          </Dimmer.Dimmable>
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
