import React from 'react';
import { NavLink } from 'react-router-dom';

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
                  break;
                }
        }
}

const Header = () => {
  sleep(2000);
  return (
    <NavLink className="o-app__newLinkButton" to="/new-link">
      <div className="o-app__plusBlock">+</div>
      <div className="o-app__desc">Submit a Link</div>
    </NavLink>
  )
}
export default Header;
