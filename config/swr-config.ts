import axios from 'axios';
import { PublicConfiguration } from 'swr/_internal';

export const fetcher = (url: string, token?: string) => {
  if (token) {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
  } else {
    return axios.get(url).then((res) => res.data);
  }
};

const SwrOptions: Partial<PublicConfiguration> = {
  fetcher,
  refreshInterval: 0,
  revalidateOnFocus: true,
};

export default SwrOptions;
