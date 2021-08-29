/**
 * stringBoolean: 'true' | 'false'
 *
 * 문자열 'true', 'false'를 boolean으로 변환하는 함수
 *
 * multipart-form-data에서 string 형태의 boolean값을 전달하고 있기 때문에 이를 boolean 타입으로 변환하기 위한 목적입니다.
 */
const convertStringBooleanToBoolean = (stringBoolean: 'true' | 'false') => stringBoolean === 'true';

export default convertStringBooleanToBoolean;
