import React, { useEffect, useState } from 'react';

interface MultiTypewriterProps {
  texts: string[];
  speed?: number;
  pause?: number;
  className?: string;
}

const MultiTypewriter: React.FC<MultiTypewriterProps> = ({
  texts,
  speed = 100,
  pause = 1500,
  className = ''
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    let typeSpeed = isDeleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
      } else {
        setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), pause);
      }

      if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, texts, textIndex, speed, pause]);

  return (
    <p className={`inline text-black-100 ${className}`}>
      {displayedText}
    </p>
  );
};

export default MultiTypewriter;
