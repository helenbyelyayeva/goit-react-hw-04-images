import * as Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

// export const scrollToTop = () => {
//     scroll.scrollToTop({
//       duration: 1000,
//       delay: 10,
//       smooth: 'linear',
//     });
// };

export const scrollToBottom= () => {
    scroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };