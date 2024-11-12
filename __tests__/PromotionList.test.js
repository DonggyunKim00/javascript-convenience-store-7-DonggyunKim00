import PromotionList from '../src/model/PromotionList';

describe('프로모션 테스트', () => {
  let promotionList;

  beforeEach(() => {
    const promotionData = [
      ['MD추천상품', 1, 1, '2024-01-01', '2024-12-31'],
      ['탄산2+1', 2, 1, '2024-01-01', '2024-12-31'],
      ['동균추천상품', 1, 1, '2024-01-01', '2024-11-02'],
    ];
    promotionList = PromotionList.init(promotionData);
  });

  test('프로모션의 리스트를 받아 프로모션을 생성할 수 있다.', () => {
    expect(promotionList).toBeInstanceOf(PromotionList);
  });

  test('프로모션 이름으로 해당 프로모션에 대한 정보를 조회할 수 있다.', () => {
    const promotion = promotionList.findPromotionByName('MD추천상품');

    expect(promotion).toEqual({
      name: 'MD추천상품',
      get: 1,
      buy: 1,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });
  });

  test('해당되는 프로모션 정보가 없다면 null을 반환한다.', () => {
    const promotion = promotionList.findPromotionByName('123123123');

    expect(promotion).toEqual(null);
  });
});
