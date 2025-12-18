import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onImageClick }) => {
  const { webformatURL, tags } = image;

  return (
    <div onClick={() => onImageClick(image)}>
      <img
        className={styles.galleryImg}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.objectOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageCard;
