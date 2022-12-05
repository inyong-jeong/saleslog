import {
  GET_PROFILE,
  GET_PROFILE_PICTURE
} from '../../constants/actionTypes';

import { fetchActionGenerator } from '../utils';

const getprofile = fetchActionGenerator(GET_PROFILE, 'body');
const getprofilepicture = fetchActionGenerator(GET_PROFILE_PICTURE, 'body');



export { getprofile, getprofilepicture }
