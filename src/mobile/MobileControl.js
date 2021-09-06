import { useMediaQuery } from 'react-responsive';


export function isMobile() {
  useMediaQuery({
    query: "(max-width:767px)"
  });
}