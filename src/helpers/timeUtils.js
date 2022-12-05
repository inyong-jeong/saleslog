export const convertTimeToFormat = (date) => {
	let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const fromDateInit = () => {
  const nowDate = new Date();
  nowDate.setMonth(nowDate.getMonth()-2);
  return nowDate;
}

export const calculateDiff = (creationDate) => {
  let now = new Date().getTime();
  let created = new Date(creationDate);
  let diff = new Date(now - created);
  let second = diff / 1000;
  if (second < 60)
    return "방금전";
  let minute = parseInt(diff / (1000 * 60));
  if (minute < 60)
    return `${minute}분 전`;
  let hour = parseInt(diff / (1000 * 60 * 60));
  if (hour < 24)
    return `${hour} 시간 전`;
  let day = parseInt(diff / (1000 * 60 * 60 * 24));
  if (day < 8)
    return `${day} 일 전`;
  let week = parseInt(diff / (1000* 60 * 60 * 24 * 7));
  if (week < 8)
    return `${week} 주 전`;
}