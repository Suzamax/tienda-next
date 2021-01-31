import { useSession, signIn, signOut } from 'next-auth/client';

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [session, loading] = useSession();
  const [isActive, setisActive] = React.useState(false);

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            className="button is-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <strong>Sign In</strong>
          </button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            className="button is-danger"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <strong>Sign Out</strong>
          </button>
        </Link>
      </div>
    );
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">Home</a>
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {signOutButtonNode()}
              {signInButtonNode()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
