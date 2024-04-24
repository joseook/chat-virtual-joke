import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';

const Chat = ({ defaultDescription }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showDefaultDescription, setShowDefaultDescription] = useState(true);
  const [, setIsUserInteracting] = useState(false); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageListRef = useRef(null);
  const interactionTimerRef = useRef(null);

  const responses = {
    Greeting: ['Hello there!', 'Hi! How can I help you today?'],
    Farewell: ['Goodbye!', 'Bye! Have a great day!'],
    Default: ["I'm afraid I don't have an answer for that. Can you try asking something else?"],
    Joke: ["Why did the tomato turn red? Because it saw the salad dressing!"],
  };

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { text: inputText, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');

      const intent = getIntent(inputText.toLowerCase());
      const responseText = getRandomResponse(intent);
      const botMessage = { text: responseText, isUser: false };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        scrollToBottom();
      }, 1000);
      setIsUserInteracting(true);
      setShowDefaultDescription(false);
      clearTimeout(interactionTimerRef.current);
      interactionTimerRef.current = setTimeout(() => {
        setShowDefaultDescription(true);
        setIsUserInteracting(false);
        setMessages([]);
      }, 120000);
    }
  };

  const getIntent = (text) => {
    if (text.includes('hello') || text.includes('hi')) return 'Greeting';
    else if (text.includes('bye') || text.includes('goodbye')) return 'Farewell';
    else if (text.includes('joke')) return 'Joke';
    else return 'Default';
  };

  const getRandomResponse = (intent) => {
    const responsesArray = responses[intent] || responses.Default;
    const randomIndex = Math.floor(Math.random() * responsesArray.length);
    return responsesArray[randomIndex];
  };

  const scrollToBottom = () => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const onEmojiClick = (emojiObject) => {
    setInputText((prevInput) => prevInput + emojiObject.emoji);
  };

  useEffect(() => {
    if (showDefaultDescription && !showEmojiPicker) {
      clearTimeout(interactionTimerRef.current);
      interactionTimerRef.current = setTimeout(() => {
        setShowDefaultDescription(true);
        setIsUserInteracting(false);
        setMessages([]);
      }, 120000); 
    }
  }, [showDefaultDescription, showEmojiPicker]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={messageListRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            <div className="chat-message-text">{message.text}</div>
          </div>
        ))}
      </div>
      {showDefaultDescription && !showEmojiPicker && (
        <div className="default-description">{defaultDescription}</div>
      )}
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message"
          onClick={handleEmojiPicker}
        />
        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={onEmojiClick} disableSkinTones={true} />
        )}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  defaultDescription: PropTypes.string.isRequired,
};

export default Chat;
