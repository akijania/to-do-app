const settings = {
  backend: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':8000' : ''),
    endpoint: {
      users: 'users',
    },
  },
};

export default settings;
