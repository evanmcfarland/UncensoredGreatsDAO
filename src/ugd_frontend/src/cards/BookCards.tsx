import React, { useState } from 'react';
import BookCard from './BookCard';
import useStreamingText from '../utils/Stream';
import { handleReadBookClick } from '../utils/handleReadBookClick';
import { useAuthors } from '../contexts/AuthorContext';
import BooksCard from '@/components/BooksCard/BooksCard';
import { useNavigate } from 'react-router-dom';

interface BookCardsProps {
  book: {
    author: string;
    description: string;
    categories: string[];
    imagePath: string;
    title: string;
  };
}

const BookCards: React.FC<BookCardsProps> = ({ book }) => {
  const navigate = useNavigate();
  
  const { authors } = useAuthors();
  const [flipped, setFlipped] = useState(false);

  const onCardClick = () => {
    setFlipped(!flipped);
  };

  const author = authors.find(author => author?.books?.includes(book.title));

  const onReadBookClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    // navigation can't be used inside non component files 
    // Create a navigation utility using the history package or pass down the navigation 
    handleReadBookClick(book.author, book.title, navigate);
  };

  let bookDescription = "Description not found";
  if (author) {
    const bookIndex = author?.books?.indexOf(book.title);
    bookDescription = author?.book_descriptions ? author.book_descriptions[bookIndex as number] : "Description not found";
  }

  const shouldStartStreaming = flipped;
  const streamedDescription = useStreamingText(bookDescription, 15, shouldStartStreaming);

  return (
    <div>

      <BooksCard image={book.imagePath}
        title={book.title}
        description={streamedDescription}
        flipped={flipped}
        onCardClick={onCardClick}
        onReadBookClick={onReadBookClick} />
    </div>
  );
};

export default BookCards;
