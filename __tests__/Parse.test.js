import { parseOrderInput } from '../src/utils/parse';

describe('데이터 파싱 유틸리티 함수 테스트', () => {
  test('입력된 상품과 수량을 파싱할 수 있다.', () => {
    const data = '[사이다-2],[감자칩-1]';

    expect(parseOrderInput(data)).toEqual([
      ['사이다', 2],
      ['감자칩', 1],
    ]);
  });
});
