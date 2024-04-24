import PropTypes from 'prop-types';

const Button = ({containerStyle, text}) => {
  return (
    <button className={containerStyle}>{
    text}</button>
  )

};

Button.propTypes = {
  containerStyle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
