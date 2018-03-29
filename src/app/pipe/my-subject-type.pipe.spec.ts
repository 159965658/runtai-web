import { MySubjectTypePipe } from './my-subject-type.pipe';

describe('MySubjectTypePipe', () => {
  it('create an instance', () => {
    const pipe = new MySubjectTypePipe();
    expect(pipe).toBeTruthy();
  });
});
