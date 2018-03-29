import { MyGradeSubPipe } from './my-grade-sub.pipe';

describe('MyGradeSubPipe', () => {
  it('create an instance', () => {
    const pipe = new MyGradeSubPipe();
    expect(pipe).toBeTruthy();
  });
});
