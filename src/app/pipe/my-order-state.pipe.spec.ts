import { MyOrderStatePipe } from './my-order-state.pipe';

describe('MyOrderStatePipe', () => {
  it('create an instance', () => {
    const pipe = new MyOrderStatePipe();
    expect(pipe).toBeTruthy();
  });
});
