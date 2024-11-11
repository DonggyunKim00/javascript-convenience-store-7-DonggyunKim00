import { parseOrderInput, getTextLength, formatWithPadding } from '../src/utils/parse.js';

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

describe('문자의 길이를 지정하고 부족한 길이는 공백을 추가하는 함수 테스트', () => {
  test.each([
    { str: '안녕', length: 8, answer: '안녕    ' },
    { str: 'hello', length: 8, answer: 'hello   ' },
    { str: '1 2 3', length: 8, answer: '1 2 3   ' },
  ])('길이보다 짧을 경우 공백을 채운다.', () => {
    expect(formatWithPadding('안녕', 8)).toBe('안녕    '); // 4글자 + 4공백
  });

  test.each([
    { str: '안녕', length: 4, answer: '안녕' },
    { str: 'hello안녕', length: 9, answer: 'hello안녕' },
    { str: '!안녕!', length: 6, answer: '!안녕!' },
  ])('길이와 동일한 경우 추가 공백을 채우지 않는다.', ({ str, length, answer }) => {
    expect(formatWithPadding(str, length)).toBe(answer);
  });
});
