import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29734791-3fd561d0afce25ff9315d455c';
const PER_PAGE = 12;
const FILTERS = `image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

export const fetchImages = async (page, query) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&${FILTERS}`
  );
  return response.data;
};

export const PER_PAGE_VALUE = PER_PAGE;
