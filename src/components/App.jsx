import { useState, useEffect, useCallback } from 'react';
import { scrollToBottom } from './Info/Scroll';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Info/Api';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const [searchQuery, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('null');
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [isButtonVisible, setVisibility] = useState('');
  const [loading, setLoading] = useState('');
  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (search, page) => {
    if (!search) {
      return;
    } setLoading('true');
    try {
      const { hits, totalHits } = await fetchImages(search, page);
      if (search.length === 0 || totalHits === 0) {
        toast.error('Nothing was found :(');
        setVisibility('');
        return;
      } else if (page === 1) {
        toast.success(`${totalHits} images were found`);
      }
      setItems(prevItems => [...prevItems, ...hits]);
      setVisibility('true' && page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError(error.message);
    }
    finally {
      setLoading('false');
    }
  }


  const handleFormSubmit = ({ query }) => {
    if (query.trim() === '') {
      toast.error('Please enter some data');
      setItems([]);
      setVisibility('');
      return;
    }
    setSearch(query);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollToBottom();
  };

  const openModal = useCallback(
    link => {
      setLargeImageUrl(link);
    },
    [setLargeImageUrl]
  );

  const onCloseModal = () => {
    setLargeImageUrl('');
  };

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <Searchbar onSubmit={handleFormSubmit} />
      {loading === 'true' && page === 1 ? (
        <Loader />
      ) : (
        <ImageGallery items={items} onSelect={openModal} />
      )}
      {isButtonVisible && <Button onLoadMore={loadMore} />}
      {largeImageUrl.length > 0 && (
        <Modal url={largeImageUrl} onClose={onCloseModal} />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
}

