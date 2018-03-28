import React, { Component } from 'react';
import {Container} from './styles';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { push } from 'react-router-redux';
import  Form  from '../form';
import 'antd/dist/antd.css';

const fields = [
  {
      name: "firstName",
      label: "First Name",
      type: "text",
      options:{
          rules:{
            presence : true,
            length: {
              minimum: 3,
              message: "can't be empty"
            }
          },
          initialValue: "Bhupali",
          placeholder: "Enter Your First Name"
      },
  },
  {
      name: "lastName",
      label: "Last Name",
      type: "text",
      options:{
          rules:{
            presence : true,
            length: {
              minimum: 3,
              message: "can't be empty"
            }
          },
          initialValue: "Chiplunkar",
          placeholder: "Enter Your Last Name"
      }
  }
];

class App extends Component{
  render(){
    return (
      <Container>
        <Switch>
          <Route
            path="/"
            component={({ match }) => (
              <Form fields = {fields} onSubmit={(formData) => console.log(formData)}/>
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