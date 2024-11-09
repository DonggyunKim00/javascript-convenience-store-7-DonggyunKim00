# 미션 - 편의점 🏆

## 💡 입력 조건

#### 구현에 필요한 상품 목록과 행사 목록을 파일 입출력을 통해 불러온다.

- public/products.md과 public/promotions.md 파일을 이용한다.
- 두 파일 모두 내용의 형식을 유지한다면 값은 수정할 수 있다.

#### 구매할 상품과 수량을 입력 받는다. 상품명, 수량은 하이픈(-)으로, 개별 상품은 대괄호([])로 묶어 쉼표(,)로 구분한다.

```
구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-3],[에너지바-5]
```

#### 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력받는다.

- Y: 증정 받을 수 있는 상품을 추가한다.
- N: 증정 받을 수 있는 상품을 추가하지 않는다.

```
현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
Y
```

#### 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력받는다.

- Y: 일부 수량에 대해 정가로 결제한다.
- N: 정가로 결제해야하는 수량만큼 제외한 후 결제를 진행한다.

```
현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
Y
```

#### 멤버십 할인 적용 여부를 입력 받는다.

- Y: 멤버십 할인을 적용한다.
- N: 멤버십 할인을 적용하지 않는다.

```
멤버십 할인을 받으시겠습니까? (Y/N)
Y
```

#### 추가 구매 여부를 입력 받는다.

- Y: 재고가 업데이트된 상품 목록을 확인 후 추가로 구매를 진행한다.
- N: 구매를 종료한다.

```
감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y
```

---

## 💡 출력 조건

#### 환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다. 만약 재고가 0개라면 재고 없음을 출력한다.

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개
```

#### 구매 상품 내역, 증정 상품 내역, 금액 정보를 출력한다.

```
===========W 편의점=============
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
===========증	정=============
콜라		1
==============================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000
```

#### 사용자가 잘못된 값을 입력했을 때, "`[ERROR]`"로 시작하는 오류 메시지와 함께 상황에 맞는 안내를 출력한다.

- 구매할 상품과 수량 형식이 올바르지 않은 경우: `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`
- 존재하지 않는 상품을 입력한 경우: `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`
- 구매 수량이 재고 수량을 초과한 경우: `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
- 기타 잘못된 입력의 경우: `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`

#### 실행 결과 예시

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-3],[에너지바-5]

멤버십 할인을 받으시겠습니까? (Y/N)
Y

===========W 편의점=============
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
===========증	정=============
콜라		1
==============================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 7개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-10]

현재 콜라 4개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
N

===========W 편의점=============
상품명		수량	금액
콜라		10 	10,000
===========증	정=============
콜라		2
==============================
총구매액		10	10,000
행사할인			-2,000
멤버십할인			-0
내실돈			 8,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 재고 없음 탄산2+1
- 콜라 1,000원 7개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[오렌지주스-1]

현재 오렌지주스은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
Y

===========W 편의점=============
상품명		수량	금액
오렌지주스		2 	3,600
===========증	정=============
오렌지주스		1
==============================
총구매액		2	3,600
행사할인			-1,800
멤버십할인			-0
내실돈			 1,800

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
N
```

---

## 📚 기능 명세서

#### 재고

- [x] 상품을 재고에 등록할 수 있다.
- [x] 상품들의 최신 재고 상태에 대한 정보를 제공할 수 있다.
- [x] 상품 이름에 해당하는 재고가 있는지 확인할 수 있다.
- [x] 재고에서 결제할 상품의 수량이 빠질 수 있는지 확인할 수 있다.

#### 상품 정보

- [x] 이름, 가격, 개수를 받아 상품을 생성할 수 있다.
- [x] 상품 개수를 차감 시킬 수 있다.
- [x] 상품 개수를 입력받아 구매 수량이 재고 수량을 초과하였다면 예외처리한다.
- [x] 프로모션 기간이 유효한지 판단할 수 있다.

#### 프로모션 리스트

- [x] 프로모션의 정보를 받아 프로모션을 생성할 수 있다.
- [x] 프로모션 이름으로 해당 프로모션에 대한 정보를 조회할 수 있다.

#### 포스기

- [x] 구매할 상품과 수량을 입력받고, 재고를 이용하여 포스기를 생성할 수 있다.
- [x] 구매 상품 내역(구매한 상품명, 수량, 가격)을 조회할 수 있다.
- [ ] 증정 상품 내역(프로모션에 따라 무료로 제공된 증정 상품의 목록)을 조회할 수 있다.
  - [ ] 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져왔는지 판단할 수 있다.
  - [ ] 일부 수량을 프로모션 혜택 없이 결제해야 하는지 판단할 수 있다.
- [ ] 금액 정보를 조회할 수 있다.
  - [ ] 총구매액(구매한 상품의 총 수량과 총 금액)
  - [ ] 행사할인(프로모션에 의해 할인된 금액)
  - [ ] 멤버십할인(멤버십에 의해 추가로 할인된 금액)
    - [ ] 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받을 수 있다. (프로모션 상품을 제외한 금액의 30%)
    - [ ] 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용할 수 있다.
    - [ ] 멤버십 할인의 최대 한도는 8,000원이다.
  - [ ] 내실돈(최종 결제 금액)
- [ ] 상품을 구매할 수 있다.
  - [ ] 구매한 개수만큼 해당 상품의 재고 개수를 줄일 수 있다.
  - [ ] 프로모션 재고를 우선적으로 차감한다.
  - [ ] 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다.
  - [ ] 프로모션 혜택은 프로모션 재고 내에서만 적용할 수 있다.

#### 기타

- [x] `products.md` 파일을 읽어올 수 있다.
  - [x] 동일 상품에 여러 프로모션이 적용되지 않는다.
  - [x] 텍스트 데이터를 파싱할 수 있다.
- [x] `promotions.md` 파일을 읽어올 수 있다.
  - [x] 프로모션의 buy는 `N`이며, get은 `1`고정이다.
  - [x] 프로모션의 형태는 1+1 또는 2+1 프로모션만 가능하다.
  - [x] 텍스트 데이터를 파싱할 수 있다.
- [x] InputView 를 사용하여 입력 클래스를 구현한다.
  - [x] 상품의 가격과 수량을 입력받을 수 있다.
  - [x] 프로모션에 필요한 수량을 추가로 받을지 입력받을 수 있다.
  - [x] 프로모션이 적용되지 않는 일부 수량에 대해 정가로 결제할지 입력받을 수 있다.
  - [x] 멤버쉽을 적용할건지 입력받을 수 있다.
  - [x] 구매 종료 후 추가 구매를 진행할지 또는 종료할지 입력받을 수 있다.
- [x] OutputView 를 사용하여 출력 클래스를 구현한다.
  - [x] 환영 메시지를 출력할 수 있다.
  - [x] 상품을 출력할 수 있다.
  - [ ] 영수증을 출력한다.
    - [x] 구매 상품 내역 출력
    - [ ] 증정 상품 내역 출력
    - [ ] 금액 정보 출력
  - [x] 사용자가 잘못된 값을 입력했을 때, `[ERROR]`로 시작하는 오류 메시지를 출력한다.
- [x] 구매할 상품과 수량 입력을 배열형태로 파싱할 수 있다.
- [x] 사용자가 잘못된 값 입력할 경우 에러 메시지를 출력한 다음 해당 지점부터 다시 입력을 받을 수 있다.

#### 예외 처리

- [x] 구매할 상품과 수량 형식이 올바르지 않은 경우 `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.` 예외 처리 한다.
- [x] 존재하지 않는 상품을 입력한 경우 `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.` 예외 처리 한다.
- [x] 구매 수량이 재고 수량을 초과한 경우 `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시  입력해 주세요.` 예외 처리 한다.
- [x] 기타 잘못된 입력의 경우: `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.` 예외 처리 한다.

---

## ✅️ 체크리스트

- [ ] 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가하였는가?
- [ ] 살아있는 기능명세서를 만들었는가?
- [ ] 관련 함수를 묶어 클래스를 만들고, 객체들이 협력하여 하나의 큰 기능을 수행하도록 하였는가?
- [ ] 클래스와 함수에 대한 단위 테스트를 통해 의도한 대로 정확하게 작동하는 영역을 확보하였는가?
- [ ] 3주차 공통 피드백을 적용하였는가?
  - [ ] 객체를 객체답게 사용하였는가? => getter를 사용하는 대신 객체에 메시지를 보냈는가?
  - [ ] 테스트 코드를 리팩터링 하였는가?
- [ ] 질문에 대한 최종 회고를 진행하였는가?
- [ ] TDD 방식을 사용하였는가?
- [ ] Airbnb 자바스크립트 코드 컨벤션을 지키면서 프로그래밍 하였는가?
- [ ] indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현하였는가?
- [ ] 3항 연산자를 쓰지 않았는가?
- [ ] 함수(또는 메서드)가 한 가지 일만 하도록 최대한 작게 만들었는가?
- [ ] else를 지양 하였는가?
- [ ] 함수(또는 메서드)의 길이가 10라인을 넘어가지 않도록 구현하였는가?
- [ ] 입출력을 담당하는 클래스를 별도로 구현하였는가? (`InputView`, `OutputView`)
- [ ] `@woowacourse/mission-utils`에서 제공하는 `Console` 및 `DateTimes` API를 사용하여 구현하였는가?
