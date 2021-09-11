import {
  POST_WORKGROUP_LOGO,
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

export const postWorkGroupLogo  = fetchActionGenerator(POST_WORKGROUP_LOGO, 'body'); 

