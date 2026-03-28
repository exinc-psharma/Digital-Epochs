import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ERAS } from '../../constants/eras';

/**
 * Interactive Scroll Progress Bar
 * Displays current scroll progress and markers for each era.
 * 
 * @param {string} activeSection - The ID of the currently visible era.
 * @param {function} onNavigate - Callback triggered when a marker is clicked.
 */
const ScrollProgressBar = ({ activeSection, onNavigate }) => {
  const fillRef = useRef(null);
  const [hoveredEra, setHoveredEra] = useState(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    // A passive trigger that updates the scale of the fill bar based on global scroll.
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        fill.style.transform = `scaleX(${self.progress})`;
        
        // Visual indicator for reaching the end of the journey.
        if (self.progress > 0.95) {
          fill.classList.add('completed');
        } else {
          fill.classList.remove('completed');
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div ref={fillRef} className="progress-bar-fill" />
      </div>
      <div className="progress-markers">
        {ERAS.map((era) => (
          <div
            key={era.id}
            className={`progress-marker ${activeSection === era.id ? 'active' : ''}`}
            style={{ left: `${era.pos}%`, '--mc': era.accent }}
            onClick={() => onNavigate(era.id)}
            onMouseEnter={() => setHoveredEra(era.id)}
            onMouseLeave={() => setHoveredEra(null)}
          >
            <div className="marker-dot" />
            {hoveredEra === era.id && (
              <div className="marker-tooltip">{era.label}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgressBar;
