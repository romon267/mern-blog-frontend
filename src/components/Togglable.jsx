import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {visible
        ? (
          <>
            <button
              type="button"
              onClick={toggleVisibility}
              className="inline-flex mt-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            >
              Cancel
            </button>
            {children}
          </>
        )
        : (
          <button
            id={buttonLabel.toLowerCase().replace(' ', '-')}
            type="button"
            onClick={toggleVisibility}
            className="inline-flex mt-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {buttonLabel}
          </button>
        )}
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.PropTypes.element.isRequired,
};

export default Togglable;
