import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon } from 'semantic-ui-react';

import MonthliesContainer from './monthlies.container';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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

    return (
      <Container>
        {header}
        <MonthliesContainer />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {
  },
)(MainContainer);
