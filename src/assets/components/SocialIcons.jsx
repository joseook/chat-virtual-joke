import PropTypes from 'prop-types';
import { FaGithubAlt, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import '../style/SocialIcons.css';

const icons = [
    {
        path: 'https://github.com/joseook',
        name: <FaGithubAlt size={22}/>
    },
    {
        path: '/',
        name: <FaDiscord size={22}/>
    },
    {
        path: '/',
        name: <FaXTwitter size={22}/>
    },
]

const SocialIcons = ({ containerStyle, styleIcon }) => {
  return (
    <div className={containerStyle}>
        { icons.map((icon, i) => {
            return <a href={icon.path} key={i}><div className={styleIcon}>{icon.name}</div></a>
        })}
    </div>
  )
};

SocialIcons.propTypes = {
    containerStyle: PropTypes.string.isRequired,
    styleIcon: PropTypes.string.isRequired,
};

export default SocialIcons;
