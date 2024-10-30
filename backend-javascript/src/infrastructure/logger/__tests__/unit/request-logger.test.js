import requestLogger from '../../request-logger';
import logger from '../../logger';

jest.mock('../../logger', () => ({
  info: jest.fn(),
}));

describe('requestLogger middleware', () => {
  let reqMock, resMock, nextMock;

  beforeEach(() => {
    reqMock = {
      method: 'GET',
      originalUrl: '/api/continents',
      ip: '127.0.0.1',
    };
    resMock = {};
    nextMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should log the request method, URL, and IP address', () => {
    requestLogger(reqMock, resMock, nextMock);

    expect(logger.info).toHaveBeenCalledWith('GET /api/continents - 127.0.0.1');
    expect(nextMock).toHaveBeenCalled();
  });

  test('should call next to proceed to the next middleware', () => {
    requestLogger(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalled();
  });
});
