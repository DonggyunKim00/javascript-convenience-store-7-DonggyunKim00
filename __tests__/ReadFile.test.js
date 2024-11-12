import * as fs from 'fs';
import { readProductsFile, readPromotionsFile } from '../src/utils/readFile.js';

jest.mock('fs');

describe('파일 읽기 유틸리티 함수 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('products.md 파일의 텍스트 데이터를 파싱할 수 있다.', () => {
    const data = 'name,price,quantity,promotion\n콜라,1000,10,탄산2+1\n사이다,1200,8,null';

    fs.readFileSync.mockReturnValue(data);

    const result = readProductsFile();
    const expected = [
      ['콜라', '1000', '10', '탄산2+1'],
      ['사이다', '1200', '8', 'null'],
    ];

    expect(result).toEqual(expected);
  });

  test('promotions.md 파일의 텍스트 데이터를 파싱할 수 있다.', () => {
    // 가상의 파일 데이터 설정
    const data =
      'name,buy,get,start_date,end_date\nMD추천상품,1,1,2024-01-01,2024-12-31\n탄산2+1,2,1,2024-01-01,2024-12-31\n';

    fs.readFileSync.mockReturnValue(data);

    const result = readPromotionsFile();
    const expected = [
      ['MD추천상품', '1', '1', '2024-01-01', '2024-12-31'],
      ['탄산2+1', '2', '1', '2024-01-01', '2024-12-31'],
    ];

    expect(result).toEqual(expected);
  });
});
