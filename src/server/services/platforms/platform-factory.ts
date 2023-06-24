import { SupportedPlatforms } from '../../../types/constants';
import PlatformService from './base';
import NetlifyService from './netlify.service';
import VercelService from './vercel.service';

const getPlatformService = (platform?: SupportedPlatforms): PlatformService => {
  return platform === SupportedPlatforms.Netlify ? new NetlifyService() : new VercelService();
};

export default getPlatformService;
