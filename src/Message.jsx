import React, {Component} from 'react';


class Message extends Component {


  render() {

    console.log("Rendering <Message />");
    return (
      <div id="message">
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
      </div>
    );
  }
}

export default Message;
