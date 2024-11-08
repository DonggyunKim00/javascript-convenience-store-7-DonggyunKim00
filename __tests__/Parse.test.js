import { parseOrderInput, getTextLength } from '../src/utils/parse.js';

describe('데이터 파싱 유틸리티 함수 테스트', () => {
  test('입력된 상품과 수량을 파싱할 수 있다.', () => {
    const data = '[사이다-2],[감자칩-1]';

    expect(parseOrderInput(data)).toEqual([
      ['사이다', 2],
      ['감자칩', 1],
    ]);
  });
});

describe('문자 형태에 따른 길이를 구하는 함수 테스트', () => {
  test.each([
    { string: 'hello', answer: 5 },
    { string: '안녕하세요', answer: 10 },
    { string: 'hello안녕', answer: 9 },
    { string: '', answer: 0 },
    { string: '!@#안녕', answer: 7 },
  ])('"$string"은 길이가 $answer이다.', ({ string, answer }) => {
    expect(getTextLength(string)).toBe(answer);
  });
});
