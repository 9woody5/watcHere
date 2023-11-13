/**
 * 문자열을 받아들여 지정된 길이 이상이면 길이를 초과하는 부분을 자르고 "..."을 추가하여 반환합니다.
 * @param {string} text - 처리할 문자열
 * @param {number} len - 최대 길이
 * @returns {string} - 최대 길이까지 자른 문자열 또는 원래 문자열
 */
export const textOverflow = (text, len) => {
  if (text.length > len) {
    return text.substring(0, len) + "...";
  } else {
    return text;
  }
};
