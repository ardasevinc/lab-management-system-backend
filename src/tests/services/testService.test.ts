import testService from '@/services/testService';

describe('test service', () => {
  it('should test service', () => {
    expect(testService()).toBe('test service');
  });
});

