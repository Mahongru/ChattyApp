import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';


class App extends Component {

  constructor(props) {
    super(props)
    //Set inital state
    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
      };
    }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 1000);

      this.socket = new WebSocket ('ws://localhost:4000/', 'Chat')
      this.socket.onopen = (event) => {
        console.log('Connected to server!');

      }
        this.socket.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages})
        }
  }

  updateUsername (username) {
    this.setState({ currentUser: { name: username } });
  }

  broadcastMessage (text) {
    //create the object with data
    const newMess = {
      id: uuid.v4(),
      username: this.state.currentUser.name,
      content: text
    }
    this.socket.send(JSON.stringify(newMess));
  }




  // Data is passed down in render
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser.name}
          messages={this.state.messages}
          updateName={this.changeUsername}
          onMessageCompleted={this.broadcastMessage}
          usernameChanged={this.updateUsername} />
      </div>
    );
  }
}

export default App;
