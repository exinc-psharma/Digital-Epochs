import React from 'react';

/**
 * Visual Overlay for era transitions.
 * This component provides a clean black fade during significant theme changes.
 * 
 * @param {boolean} visible - Whether the overlay is active.
 */
const TransitionOverlay = ({ visible }) => (
  <div className={`transition-overlay ${visible ? 'active' : ''}`} />
);

export default TransitionOverlay;
