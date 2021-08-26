// 고차 컴포넌트 생성을 도와주는 함수입니다. 아래 예시와 같이 가독성을 향상시킵니다.
// withA(withB(SomeComponent)) -> composeComponent(withA, withB)(SomeComponent);
const composeComponent =
  (...hocFunctions: ((WrappedComponent: React.FC) => React.FC)[]) =>
  (initialComponent: React.FC) =>
    hocFunctions.reduceRight((currentComponent, fn) => fn(currentComponent), initialComponent);

export default composeComponent;
