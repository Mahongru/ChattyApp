import React, {Component} from "react";


  class Chatbar extends Component {
    constructor(props) {
      super(props)
      console.log(props);
      this.state = {
        messageValue: '',
        usernameValue: this.props.currentUser.name
      }
      this.onMessageKeyUp = this.onMessageKeyUp.bind(this);
      this.messageInputChange = this.messageInputChange.bind(this);
      this.userInputChange = this.userInputChange.bind(this);
      this.onUsernameKeyUp = this.onUsernameKeyUp.bind(this);
    }

    messageInputChange (event) {
      this.setState({ messageValue: event.target.value })
    }
    onMessageKeyUp (event) {
      event.preventDefault();
      if (event.key === "Enter") {
        this.props.onMessageCompleted(this.state.messageValue)
        this.setState({messageValue: ''})
      }
    }

    userInputChange (event) {
      this.setState({ usernameValue: event.target.value })
    }
    onUsernameKeyUp (event) {
      event.preventDefault();
      if (event.key === "Enter") {
         this.props.usernameChanged(this.state.usernameValue);
      }
    }

    render() {
      console.log("Rendering <Chatbar/>");
      return (
        <footer>
          <input id="username"
            type="text"
            value={this.state.usernameValue}
            onChange={this.userInputChange}
            onKeyUp={this.onUsernameKeyUp}
           />

          <input id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            value={this.state.messageValue}
            onChange={this.messageInputChange}
            onKeyUp={this.onMessageKeyUp}
           />
        </footer>
      );
    }
  }

  export default Chatbar;