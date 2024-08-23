class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  parse(message) {
    this.actionProvider.ChatBotHandler(this.state, message);
  }
}

export default MessageParser;

new MessageParser();