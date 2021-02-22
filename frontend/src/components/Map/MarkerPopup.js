import React from 'react';
import {Popup} from 'react-leaflet';

const MarkerPopup = (props) => {
  const { title } = props.data;

  return  (<Popup>
    <div className='poup-text'>{title}</div>
  </Popup>);
};

export default MarkerPopup;