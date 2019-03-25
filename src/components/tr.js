import React from 'react';
import PropTypes from 'prop-types';

const mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

const Img = (props) => {
    const {thumbnails, screenshot, title} = props.pic;
    if (thumbnails !== null) {
        return <img src={mediaUrl + thumbnails.w160} alt={title}/>;
    } else {
        return <img src={mediaUrl + screenshot} alt={title}/>;
    }
};

const Tr = (props) => {
  const {title, description, filename} = props.pic;
  return (
      <tr>
          <td>
              <Img pic={props.pic}/>
          </td>
          <td>
              <h3>{title}</h3>
              <p>{description}</p>
          </td>
          <td>
              <a href={mediaUrl + filename}>View</a>
          </td>
      </tr>
  );
};

Tr.propTypes = {
    pic: PropTypes.object,
};

export default Tr;