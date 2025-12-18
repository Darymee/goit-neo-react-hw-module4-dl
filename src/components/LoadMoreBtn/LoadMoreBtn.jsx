import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={styles.loadMoreBtn}
      onClick={onLoadMore}
    >
      {disabled ? 'Loading…' : 'Load more'}
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoadMoreBtn;
