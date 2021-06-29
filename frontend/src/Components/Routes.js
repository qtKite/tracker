import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Panel from './Panel';
import { getUserInfo } from './Auth/Auth'
import { Button, Form, Col } from 'react-bootstrap'
import Navigation from './Navigation';

export class Routes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verified: false,
      username: '',
    }

    this.updateVerified = this.updateVerified.bind(this)
  }

  async updateVerified() {
    try {
      let result = await getUserInfo()
      this.setState({
        verified: result.detail === 'success',
        username: result.username,
      })
    } catch (e) {
      this.setState({
        verified: false
      })
    }
  }

  async componentDidMount() {
    this.updateVerified()
  }

  render() {

    if (this.state.verified) {
      return (
        <Router>
          <Navigation doRefresh={this.updateVerified} user={this.state.username} />
          <Panel onLogout={this.updateVerified} />
        </Router>
      )
    }

    return (
      <Router>
        <Navigation doRefresh={this.updateVerified} />
        <Route exact path="/">
          <Form className="gap-2">
            <Form.Group as={Col}>
              <Link to="/login"><Button className="w-100">Login</Button></Link>
            </Form.Group>
            <Form.Group as={Col}>
              <Link to="/register"><Button className="w-100">Register</Button></Link>
            </Form.Group>
          </Form>
        </Route>
        <Switch>
          <Route path="/login">
            <Login onLoginSuccess={this.updateVerified} />
          </Route>
          <Route path="/register">
            <Register onRegisterSuccess={this.updateVerified} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Routes
