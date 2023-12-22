import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, style }) => {
    const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 100); 

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <span style={style}>{displayText}</span>;
};

export default TypewriterEffect;
