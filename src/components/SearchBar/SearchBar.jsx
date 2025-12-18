import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const normalized = query.trim();

    if (!normalized) {
      toast.error('Please enter a search term 🙂');
      return;
    }

    onSubmit(normalized);
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrap}>
          <FaMagnifyingGlass className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={query}
          />
        </div>

        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
