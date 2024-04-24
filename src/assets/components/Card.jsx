import PropTypes from 'prop-types';
import '../style/Card.css';
import Chat from './ChatVirtual';

const Card = ({ title, description, containerStyle }) => {
  return (
    <div className={`card ${containerStyle}`}>
      <div className="content-info">
        <div className="card-header">
          <h1>{title}</h1>
        </div>
        <div className="chat-box">
          <div className="chat-message">
            <p className="chat-message-text">{description}</p>
          </div>
          <Chat />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  containerStyle: PropTypes.string.isRequired,
};

export default Card;
