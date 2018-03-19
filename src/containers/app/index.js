import React, { Component } from 'react';
import {Container} from './styles';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { push } from 'react-router-redux';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

class App extends Component{
  render(){
    return (
      <Container>
        <Switch>
          <Route
            path="/"
            component={({ match }) => (
              <DatePicker />
            )}
          />
        </Switch>
      </Container>
    )
  }
}

const mapStateToProps = ({ location }) => ({ location });

const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(push(route))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));