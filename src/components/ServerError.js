import React from 'react';
import sun from '../images/sun.svg';
const ServerError = () => {
  {
    return (
      <div className="serverError">
        <h3>
          Connecting to server,<br />
          please wait...
        </h3>
        <img src={sun} className="spinner" alt="spinner-sun" />
      </div>
    );
  }
};

export default ServerError;