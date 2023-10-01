import React, { useState, useEffect } from 'react';
import useStreamingText from '../../utils/Stream';
import AuthorCard from '../cards/AuthorCard'

interface AuthorCardsProps {
  author: {
    id: string;
    description: string;
    categories: string[];
  };
}

const AuthorCards: React.FC<AuthorCardsProps> = ({ author }) => {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const shouldStartStreaming = hasFlipped;
  
  const streamedDescription = useStreamingText(author.description, 15, shouldStartStreaming);

  useEffect(() => {
    if (cardFlipped && !hasFlipped) {
      setHasFlipped(true);
    }
  }, [cardFlipped]);

  const handleClick = () => {
    setCardFlipped(!cardFlipped);
  };

  return (
    <div
      className={`
        author-container flex
        ${cardFlipped ? 'expanded w-auto' : 'w-[150px]'}
      `}
    >
      <AuthorCard
        image={`/images/${author.id}.png`}
        title={author.id}
        onCardClick={handleClick}
        flipped={cardFlipped}
        description={streamedDescription}
      />
    </div>
  );
};

export default AuthorCards;

