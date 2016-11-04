import React, {Component} from 'react';

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <nav>
        <h1>Chatty<span id="online">Users Online: {this.props.online}</span></h1>
      </nav>

      )
  }
}

export default Nav;