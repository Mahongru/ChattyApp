import React, {Component} from 'react';
import Message from './Message.jsx';



  class MessageList extends Component {


    render() {
      console.log("Rendering <MessageList/>");
      return (
        <div id="message-list">
          {this.props.messages.map((message)=> {
            switch(message.type) {
              case 'incomingMessage':
                return <Message
                  key={message.id}
                  username={message.username}
                  content={message.content}
                  />
              case 'incomingNotification':
                return <div className='message system' key={message.id}>{message.content}</div>
              }
            })
          }
        </div>
      );

    }
  }

  export default MessageList;
