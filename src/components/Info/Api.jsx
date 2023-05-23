
import axios from 'axios';

export const fetchImages = async (search, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34999882-fa357dcb5108de4c3df8b432d';
  const { data } = await axios.get(
    `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
