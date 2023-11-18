/**
 * 문자열을 받아들여 지정된 길이 이상이면 길이를 초과하는 부분을 자르고 "..."을 추가하여 반환합니다.
 * @param {string} text - 처리할 문자열
 * @param {number} len - 최대 길이
 * @returns {string} - 최대 길이까지 자른 문자열 또는 원래 문자열
 */
export function TextOverflow(text, len) {
  if (text.length > len) {
    return text.substring(0, len) + "...";
  } else {
    return text;
  }
}

/**
 * \n으로 줄바꿈되는 일반 텍스트의 경우 리액트에서 \n 처리가 정상적으로 되지않아
 *
 * 해당 텍스트들을 DIV 로 감싸서 리턴하는 코드
 *
 * @param {String} text \n 으로 줄바꿈 되는 텍스트
 *
 * @returns
 */
export function EnterToDiv({ text }) {
  const lines = text.split("\n");

  const jsxLines = lines.map((line, idx) => <div key={idx}>{line}</div>);

  return jsxLines;
}
