export const timeForToday = (date: string) => {
  const today = new Date();
  const timeValue = new Date(date.substring(0, 19)); // ios safari yyyy-mm-ddThh:mm:ss Z를 빼면 타임존이 적용되지 않는다.

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTimeHour / 24);

  if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일 전`;
  }

  const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
  if (betweenTimeWeek < 4) {
    return `${betweenTimeWeek}주 전`;
  }

  const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
  if (betweenTimeMonth === 0) {
    return `1달 전`;
  }
  if (betweenTimeMonth < 12) {
    return `${betweenTimeMonth}달 전`;
  }

  const value = today.toISOString().substring(0, 10);

  return value;
};
