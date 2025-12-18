import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import { fetchImages, PER_PAGE_VALUE } from './components/api/api';

import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const requestIdRef = useRef(0);

  const createGallery = useCallback(async (page, q) => {
    const requestId = ++requestIdRef.current;

    try {
      setIsError(false);
      setErrorMessage(null);
      setIsLoading(true);

      const data = await fetchImages(page, q);
      if (requestId !== requestIdRef.current) return;

      const results = data?.hits ?? [];
      const hitsTotal = data?.totalHits ?? 0;

      if (!results.length) {
        setImages([]);
        setTotalPages(0);
        toast.error('Sorry, no results for your search. Try again! 😭');
        return;
      }

      if (page === 1) {
        toast.success(`We found ${hitsTotal} images for you! 😍`);
      }

      setTotalPages(Math.ceil(hitsTotal / PER_PAGE_VALUE));
      setImages(prev => (page === 1 ? results : [...prev, ...results]));
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      setIsError(true);
      setErrorMessage(
        `Oops, something went wrong 😭 Please try again: ${error.message}`
      );
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    createGallery(currentPage, query);
  }, [currentPage, query, createGallery]);

  const handleSearchSubmit = useCallback(
    newQuery => {
      const normalized = newQuery.trim();

      if (!normalized) {
        toast.error('Please enter a search term 🙂');
        return;
      }

      if (normalized === query) {
        toast.info('You already see pictures for this query 😊');
        return;
      }

      setQuery(normalized);
      setCurrentPage(1);
      setImages([]);
      setIsError(false);
      setErrorMessage(null);
      setTotalPages(0);
    },
    [query]
  );

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setCurrentPage(prev => prev + 1);
  }, [isLoading]);

  const openModal = useCallback(image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  const canLoadMore = currentPage < totalPages;

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />

      <div className={styles.page}>
        {isError ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          images.length > 0 && (
            <ImageGallery images={images} onImageClick={openModal} />
          )
        )}

        {isLoading && <Loader />}

        {images.length > 0 && canLoadMore && (
          <LoadMoreBtn onLoadMore={loadMore} disabled={isLoading} />
        )}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
