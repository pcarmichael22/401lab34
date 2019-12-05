import React, { useState } from 'react';

const Content = props => {
  return (
    <>
      <div id="loggedIn">
        <p>You are logged in</p>
      </div>
      <div id="loggedInEdit">
        <p>You can Edit Content</p>
      </div>
      <div id="loggedInDelete">
        <p>You can Delete Content</p>
      </div>
    </>
  );
};

export default Content;
