import axios from 'axios';
import { baseUrl } from '../config';

export const log = async (response) => {
  await axios.post(`${baseUrl}/logs`, {
    message: `${response.request.__METHOD__} ${response.request.__URL__.replace('http://localhost:5000', '')} STATUS ${response.status}`,
  });
};
