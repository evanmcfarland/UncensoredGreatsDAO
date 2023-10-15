// // Context file single component version
// import React, { useState, useCallback, useContext } from 'react';
// import '../../styles/SearchBar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import AuthorFilter from './AuthorFilter';
// import MessageContext from '../../src/contexts/MessageContext';
// import MessageCard from '../cards/MessageCard/MessageCard';
// import { useAuthors } from '../contexts/AuthorContext';

// const SearchBar = ({ selectedAuthors, setSelectedAuthors, selectedCategories, setSelectedCategories }) => {
//   const [searchValue, setSearchValue] = useState('');
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [randomAuthorId, setRandomAuthorId] = useState(null);

//   const { authors } = useAuthors();

//   const allCategories = [...new Set(authors.flatMap(author => author.category))];

//   const handleSearchChange = event => setSearchValue(event.target.value);

//   const messageContext = useContext(MessageContext);

//   if (!messageContext) {
//     throw new Error("SearchBar must be used within a MessageProvider");
//   }

//   const { message, updateMessage, isLoading, error } = messageContext;

//   const handleSearchSubmit = useCallback(() => {
//     if (searchValue.trim()) {
//       const randomIndex = Math.floor(Math.random() * authors.length);
//       const randomAuthor = authors[randomIndex];
//       setRandomAuthorId(randomAuthor.id);

//       updateMessage(searchValue);
//     }
//   }, [searchValue, updateMessage]);

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSearchSubmit();
//     }
//   };

//   const toggleDropdown = () => setIsDropdownVisible(prev => !prev);

//   const handleAuthorSelection = authorId => setSelectedAuthors(prevAuthors => 
//     prevAuthors.includes(authorId) ? prevAuthors.filter(id => id !== authorId) : [...prevAuthors, authorId]);

//   const handleAllBooksSelection = () => setSelectedAuthors(
//     selectedAuthors.length === authors.length ? [] : authors.map(author => author.id)
//   );

//   const handleCategorySelection = category => setSelectedCategories(prevCategories =>
//     prevCategories.includes(category) ? prevCategories.filter(cat => cat !== category) : [...prevCategories, category]);

//   return (
//     <div className="searchbar-wrapper">
//       <div className="searchbar">
//         <AuthorFilter 
//           isDropdownVisible={isDropdownVisible}
//           toggleDropdown={toggleDropdown}
//           selectedAuthors={selectedAuthors}
//           handleAuthorSelection={handleAuthorSelection}
//           handleAllBooksSelection={handleAllBooksSelection}
//           allCategories={allCategories}
//           selectedCategories={selectedCategories}
//           handleCategorySelection={handleCategorySelection}
//         />
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Type a topic or a query..."
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="search-icon-button" onClick={handleSearchSubmit}>
//           <FontAwesomeIcon icon={faSearch} />
//         </button>
//       </div>
//       {isLoading ? (
//         <div className="loading-indicator"><div className="loader"></div></div>
//       ) : error ? (
//         <div className="error-message">{error}</div>
//       ) : message && <MessageCard messageData={message} randomAuthorId={randomAuthorId} />
//       }
//     </div>
//   );
// };

// export default SearchBar;






// Context file single component version
import React, { useState, useCallback, useContext } from 'react';
import '../../styles/SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AuthorFilter from './AuthorFilter';
import MessageContext from '../../src/contexts/MessageContext';
import MessageCard from '../cards/MessageCard/MessageCard';
import { useAuthors } from '../contexts/AuthorContext';

const SearchBar = ({ selectedAuthors, setSelectedAuthors, selectedCategories, setSelectedCategories }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { authors } = useAuthors();

  const allCategories = [...new Set(authors.flatMap(author => author.category))];

  const handleSearchChange = event => setSearchValue(event.target.value);

  const messageContext = useContext(MessageContext);

  if (!messageContext) {
    throw new Error("SearchBar must be used within a MessageProvider");
  }

  // const { message, updateMessage, isLoading, error, randomAuthorId } = messageContext;
  const { message, updateMessage, isLoading, error, randomAuthorId, setRandomAuthorId } = messageContext;

  const handleSearchSubmit = useCallback(() => {
    if (searchValue.trim()) {
      const randomIndex = Math.floor(Math.random() * authors.length);
      const randomAuthor = authors[randomIndex];
      // messageContext.randomAuthorId = randomAuthor.id;
      setRandomAuthorId(randomAuthor.id);


      updateMessage(searchValue);
    }
  }, [searchValue, updateMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const toggleDropdown = () => setIsDropdownVisible(prev => !prev);

  const handleAuthorSelection = authorId => setSelectedAuthors(prevAuthors => 
    prevAuthors.includes(authorId) ? prevAuthors.filter(id => id !== authorId) : [...prevAuthors, authorId]);

  const handleAllBooksSelection = () => setSelectedAuthors(
    selectedAuthors.length === authors.length ? [] : authors.map(author => author.id)
  );

  const handleCategorySelection = category => setSelectedCategories(prevCategories =>
    prevCategories.includes(category) ? prevCategories.filter(cat => cat !== category) : [...prevCategories, category]);

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <AuthorFilter 
          isDropdownVisible={isDropdownVisible}
          toggleDropdown={toggleDropdown}
          selectedAuthors={selectedAuthors}
          handleAuthorSelection={handleAuthorSelection}
          handleAllBooksSelection={handleAllBooksSelection}
          allCategories={allCategories}
          selectedCategories={selectedCategories}
          handleCategorySelection={handleCategorySelection}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Type a topic or a query..."
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-icon-button" onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {isLoading ? (
        <div className="loading-indicator"><div className="loader"></div></div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : message && <MessageCard />
      }
    </div>
  );
};

export default SearchBar;