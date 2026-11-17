import React from 'react';

export default function Navbar({ user, onOpenAuth, onLogout, onNewBoard }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <span>ProjectBoard</span>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <button className="btn btn-secondary" onClick={onNewBoard}>
              + New Board
            </button>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              👤 {user.name}
            </span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onOpenAuth}>
            Sign In / Register
          </button>
        )}
      </div>
    </header>
  );
}
