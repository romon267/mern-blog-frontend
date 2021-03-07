/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const StyleButton = ({ type, text, id }) => (
  <button
    type={type}
    id={id}
    className="inline-flex mt-4 py-2 px-4 shadow text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 hover:from-pink-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
  >
    {text}
  </button>
);

StyleButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default StyleButton;
