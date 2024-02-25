import PropTypes from 'prop-types';
import axios from 'axios';
import { axiosConfig } from './axiosConfig';

const baseURL = 'https://pixabay.com/api/';

export const getImages = async (word, page) => {
  const options = axiosConfig(word, page);

  try {
    const res = await axios.get(baseURL, options);
    return res.data.hits;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

getImages.propTypes = {
  word: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
