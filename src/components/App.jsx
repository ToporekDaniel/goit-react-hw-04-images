import { useEffect, useState } from 'react';
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

  //ok zmiana strony w asyncu nie wykonywała się przed wykonaniem reszty dlatego było takie dziwne kombinowanie

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const getMoreImages = async () => {
      try {
        setIsLoading(true);

        const newImages = await getImages(searchV, page);

        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        console.error('Error in getMoreImages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchV && page > 1) {
      getMoreImages();
    }
  }, [searchV, page]);

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
