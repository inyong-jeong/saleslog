const rewire = require('rewire');
const routes = rewire('../route');

describe('routes unit test', () => { 
  it('checkTokenReceived test', function() {

    // window object mock
    Object.defineProperty(window, 'location', { searh: '?token=1234124'});

  });
});