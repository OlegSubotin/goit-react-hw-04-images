import { Component } from "react";
import Notiflix from 'notiflix';
import Searchbar from "components/Searchbar";
import fetchImages from "services/imageApi";
import ImageGallery from "components/ImageGallery";
import Loader from "components/Loader";
import Button from "components/Button";
import Modal from "components/Modal";


class App extends Component{

  state = {
    topic: '',
    page: 1,
    status: 'idle',
    images: [],
    total: 0,
    error: null,
    showModal: false,
    largeImage: null,
  };

  componentDidMount() {
    this.setState({ images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevTopic = prevState.topic;
    const currentTopic = this.state.topic;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevTopic !== currentTopic || prevPage !== currentPage) {
      this.setState({ status: 'pending' });
      this.pushFetch();
    };
  }; 

  pushFetch = () => {
    const { topic, page } = this.state;
    this.setState({ status: 'pending' });
    
    fetchImages(topic, page)
      .then(resp => {
        const images = resp.hits.map(({ id, largeImageURL, webformatURL }) => ({ id, largeImageURL, webformatURL, }));
        this.setState(prevState => ({ images: [...prevState.images, ...images], status: 'resolved', total:resp.total }));
      })
      .catch(error => this.serState({ error, status: 'rejected' }));
  };

  handleFormSubmit = topic => {
    this.setState({ images: [] })
    if (this.state.topic !== topic) {
      this.setState({ topic, page: 1 });
    };    
  };

  onLoadMoreButtonClick = e => {
    e.preventDefault();
    this.setState(({page}) => ({
      page: page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  };

  imageClick = image => {
    this.setState({ largeImage: image });
  };


  render() {
    const { images , status, showModal, total, largeImage} = this.state;
    const { handleFormSubmit, onLoadMoreButtonClick, toggleModal, imageClick } = this;

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            toggleModal={toggleModal}
            onImageClick={imageClick}
          />)
        }
        {images.length < total && images.length>0 && status === "resolved" && (
          <Button onClick={onLoadMoreButtonClick}/>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && Notiflix.Notify.info('Try other topic')}
        {showModal && <Modal onClose={toggleModal} largeImage={ largeImage}/>}
      </>
    )
  };
};

export default App;