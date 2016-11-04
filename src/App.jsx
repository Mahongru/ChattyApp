import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';
import uuid from 'node-uuid';


class App extends Component {


  //-------------------------------------------------------------
  // Inital State

  constructor(props) {
    super(props)
    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.notifyNameChange = this.notifyNameChange.bind(this);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      usersOnline: 0
      };
    }


  componentDidMount() {
    console.log("componentDidMount <App />");
  //-------------------------------------------------------------
  // Establish Websocket connection

    this.socket = new WebSocket ('ws://localhost:4000/', 'Chat')
    this.socket.onopen = (event) => {
      console.log('Connected to server!');
    }

  //-------------------------------------------------------------
  // Incoming Message from Websocket

    this.socket.onmessage = (data) => {
      console.log(data)
      const newMessage = JSON.parse(event.data);

      if (newMessage.type === 'userCount') {
        this.setState({usersOnline: newMessage.data.usersOnline})
      } else {
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      }
    }
  }

  //-------------------------------------------------------------
  // Websocket usernameUpdate function

  notifyNameChange (username) {

    const newName = username;

    if(this.state.currentUser.name !== newName) {
      const newNotification = {
        type: 'postNotification',
        content: `**${this.state.currentUser.name}** changed their name to **${newName}**`
      }
    this.socket.send(JSON.stringify(newNotification));
    this.setState({ currentUser: { name: username } });
    }
  }


  //-------------------------------------------------------------
  // Websocket newmessageUpdate function


  broadcastMessage (text) {
    const newMess = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: text
    }
    this.socket.send(JSON.stringify(newMess));
  }

  //-------------------------------------------------------------

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <Nav online={this.state.usersOnline}/>
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser.name}
          messages={this.state.messages}
          updateName={this.changeUsername}
          onMessageCompleted={this.broadcastMessage}
          usernameChanged={this.notifyNameChange} />
      </div>
    );
  }
}

export default App;
