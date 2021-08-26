import '@testing-library/jest-dom/extend-expect';

// for test React-Slick
// ref : https://github.com/akiran/react-slick/issues/742
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
