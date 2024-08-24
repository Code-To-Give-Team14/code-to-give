import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  ChatBotHandler = (messageHistory, message) => {
    let newMessage = { "message": message, "type": "user", "id": Date.now() };
    messageHistory = {
      ...messageHistory,
      "messages": [...messageHistory.messages, newMessage]
    };
    console.log('Message history:', messageHistory);
    axios.post('https://port-0-code-to-give-m05y7f0q09864f76.sel4.cloudtype.app/chat', messageHistory)
      .then(response => {
        console.log('Response from "/chat" API:', response.data);
        const botMessage = this.createChatBotMessage(response.data.response);
        this.setChatbotMessage(botMessage);
      })
      .catch(error => {
        console.error('Error calling the "/chat" API:', error);
      });



    // const message = this.createChatBotMessage('Hello, friend.');
    // this.setChatbotMessage(message);

  };

  setChatbotMessage = (message) => {
    this.setState(state => ({ ...state, messages: [...state.messages, message] }));
  };
}

export default ActionProvider;