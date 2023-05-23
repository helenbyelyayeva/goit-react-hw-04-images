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
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('null');
  // const [per_page, setPerPage] = useState('');
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [isButtonVisible, setVisibility] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const getImages = async () => {

      setLoading('true');
      setVisibility('false');
      if (!search) {
        return;
      } try {
        const { hits, totalHits } = await fetchImages(search, page);
        if (search.length === 0 || totalHits === 0) {
          toast.error('Nothing was found :(');
          return;
        } else if (page === 1) {
          toast.success(`${totalHits} images were found`);
        }
        setItems(prevItems => [...prevItems, ...hits]);
        setVisibility(page < Math.ceil(totalHits /12));
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoading('false');
      }
    }
    if (search) {
      getImages();
    }
  }, [search, page]);

  const handleFormSubmit = ({ query }) => {
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

