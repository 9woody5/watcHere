// 년-월-일 형식 (예: 2022-01-15)
export const TIME_FORMATTER_yyyy_mm_dd = 1;

// 년도 두 자리, 월, 일 형식 (예: 22-01-15)
export const TIME_FORMATTER_yy_mm_dd = 2;

// 월 일, 년도 형식 (예: Jan 15, 2022)
export const TIME_FORMATTER_MM_dd_yy = 3;

// 월 일, 년도 두 자리 형식 (예: 01 15, 22)
export const TIME_FORMATTER_mm_dd_yy = 4;

// 년-월-일 시:분:초 형식 (예: 2022-01-15 12:30:45)
export const TIME_FORMATTER_yyyy_mm_dd_hh_mm_ss = 5;

// 시:분:초 형식 (예: 12:30:45)
export const TIME_FORMATTER_hh_mm_ss = 50;

/**
 * 주어진 날짜를 지정된 형식으로 포맷팅하는 함수
 *
 * 필요에따라 추가 삭제해서 사용 필요
 *
 * @param {Date} date - 포맷팅할 대상 날짜 문자열
 * @param {string} formatterType - 사용할 포맷터 타입
 * @returns {string} - 형식화된 날짜 문자열
 */
export default function DateFormat(date, formatterType) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let formattedDateTime = "";
  switch (formatterType) {
    case TIME_FORMATTER_yyyy_mm_dd:
      formattedDateTime = `${year}-${month}-${day}`;
      break;
    case TIME_FORMATTER_yy_mm_dd:
      formattedDateTime = `${year}-${month}-${day}`;
      break;
    case TIME_FORMATTER_MM_dd_yy:
      formattedDateTime = `${monthNames[parseInt(month)]} ${day}, ${year}`;
      break;
    case TIME_FORMATTER_mm_dd_yy:
      formattedDateTime = `${month}" "${day}" "${year}`;
      break;
    case TIME_FORMATTER_yyyy_mm_dd_hh_mm_ss:
      formattedDateTime = `${year}-${month}-${day}" "${hour}:${minutes}:${seconds}`;
      break;
    case TIME_FORMATTER_hh_mm_ss:
      formattedDateTime = `${hour}:${minutes}:${seconds}`;
      break;

    default:
      break;
  }
  return formattedDateTime;
}
