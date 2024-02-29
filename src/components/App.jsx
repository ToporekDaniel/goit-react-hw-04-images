import { useState } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { Button } from './button/Button';
import { getImages } from './axios/axiosGet';
import { RotatingLines } from 'react-loader-spinner';

//test bo strona się nie wczytuje

export const App = () => {
  const [searchV, setSearchV] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async searchValue => {
    try {
      setIsLoading(true);

      const newImages = await getImages(searchValue, 1);

      setSearchV(searchValue);
      setPage(1);
      setImages(newImages);
    } catch (error) {
      console.error('Error in handleSearchSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    // Nie kumam ale sam setState z prev daje błąd za pierwszym wczytaniem
    const nextPage = page + 1;

    setPage(nextPage);

    try {
      setIsLoading(true);

      const newImages = await getImages(searchV, nextPage);

      setImages(prevImages => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error in handleLoadMore:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit}></Searchbar>
      <ImageGallery dataFromApi={images}></ImageGallery>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        ''
      )}
      <br></br>
      <Button onLoadMore={handleLoadMore}></Button>
    </>
  );
};
