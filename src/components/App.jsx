import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { Button } from './button/Button';
import { getImages } from './axios/axiosGet';
import { RotatingLines } from 'react-loader-spinner';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchV: '',
      page: 1,
      images: [],
      isLoading: false,
    };
  }

  handleSearchSubmit = async searchValue => {
    try {
      this.setState({ isLoading: true });
      const images = await getImages(searchValue, 1);

      this.setState({ searchV: searchValue, page: 1, images });
      console.log(images);
    } catch (error) {
      console.error('Error in handleSearchSubmit:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    // Nie kumam ale sam setState z prev daje dłąd za pierwszym wczytaniem
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });

    try {
      this.setState({ isLoading: true });
      const images = await getImages(this.state.searchV, nextPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
      console.log(images);
    } catch (error) {
      console.error('Error in handleLoadMore:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit}></Searchbar>
        <ImageGallery dataFromApi={this.state.images}></ImageGallery>
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
        <Button onLoadMore={this.handleLoadMore}></Button>
      </>
    );
  }
}
