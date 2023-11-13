export const TIME_FORMATTER_yyyy_mm_dd = 1;
export const TIME_FORMATTER_yy_mm_dd = 2;
export const TIME_FORMATTER_MM_dd_yy = 3;
export const TIME_FORMATTER_mm_dd_yy = 4;
export const TIME_FORMATTER_yyyy_mm_dd_hh_mm_ss = 5;
export const TIME_FORMATTER_hh_mm_ss = 50;

// new Date 값을 원하는 형식으로 포맷을 바꿉니다.
// Enum 설정은 위의 TIME_FORMATTER 로 사용합니다.
export default function DateFormat(date, formatterType) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  // const hour = String(currentDate.getHours()).padStart(2, "0");
  // const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  // const seconds = String(currentDate.getSeconds()).padStart(2, "0");

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
      break;
    case TIME_FORMATTER_MM_dd_yy:
      formattedDateTime = `${monthNames[parseInt(month)]} ${day}, ${year}`;
      break;
    case TIME_FORMATTER_mm_dd_yy:
      break;
    case TIME_FORMATTER_yyyy_mm_dd_hh_mm_ss:
      break;
    case TIME_FORMATTER_hh_mm_ss:
      break;

    default:
      break;
  }
  return formattedDateTime;
}
