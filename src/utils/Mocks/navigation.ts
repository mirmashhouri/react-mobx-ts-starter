const mockResponse = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    hash: '',
    assign: mockResponse,
    replace: mockResponse,
    reload: mockResponse,
    pathname: '',
    href: '',
    search: '',
    origin: 'http://localhost',
    host: '',
    hostName: '',
    port: '',
    JSON: '',
    protocol: '',
  },
  writable: true,
});
