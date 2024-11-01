import { Endpoint } from './endpointClass';

describe('testing the Endpoint class', () => {
  test('the base contructor object', () => {
    const obj = new Endpoint('get', 'results', '/api/');
    const mockStructure = {
      method: 'GET',
      baseUrl: '/api/',
      endpoint: 'results',
    };

    expect(obj).toMatchObject(mockStructure);
  });

  test('set the content type to json', () => {
    const obj = new Endpoint('get', 'results', '/api/');
    obj.json();

    expect(obj).toHaveProperty('headers.Content-Type', 'application/json');
  });
});
