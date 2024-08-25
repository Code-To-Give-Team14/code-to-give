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
        this.setState(state => ({
            ...state,
            eventForUserToJoinAsMember: response.data.items.eventForUserToJoinAsMember,
            eventForUserToJoinAsVolunteer: response.data.items.eventForUserToJoinAsVolunteer,
            newInterests: response.data.items.newInterests,
            newSkills: response.data.items.newSkills
        }));
        const botMessage = this.createChatBotMessage(
            response.data.message,
            response.data.items.eventForUserToJoinAsMember.length > 0 || response.data.items.eventForUserToJoinAsVolunteer.length > 0 ?
            { widget: 'recommendation' } :
            response.data.items.newInterests.length > 0 || response.data.items.newSkills.length > 0 ?
            { widget: 'newInterestsOrSkills' } :
            null
        );
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