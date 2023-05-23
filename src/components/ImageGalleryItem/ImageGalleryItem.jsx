import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css";


export const ImageGalleryItem = ({ webformatURL, alt, largeImageURL, onSelect}) => {
  return (
   <li onClick={() => onSelect(largeImageURL)} className={css.photo_card} >
      <img className={css.photo}
        src={webformatURL}
        alt={alt}
      />
   </li>
  );
};



ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};