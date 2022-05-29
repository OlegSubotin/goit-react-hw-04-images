import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, largeImage, onImageClick, toggleModal }) => {
    return (
        <li className={s.item}>
            <img className={s.image} alt="img" src={smallImage} onClick={() => { toggleModal(); onImageClick(largeImage); }}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    toggleModal:PropTypes.func.isRequired,
    onImageClick:PropTypes.func.isRequired,
};

export default ImageGalleryItem;

