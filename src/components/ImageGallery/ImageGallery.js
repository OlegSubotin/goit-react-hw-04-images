import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem";
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, toggleModal, onImageClick }) => {
    return (
        <ul className={s.gallery} >
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    smallImage={webformatURL}
                    largeImage={largeImageURL}
                    onImageClick={onImageClick}
                    toggleModal={toggleModal}
                />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
    })).isRequired,
    onImageClick: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;

