export function getStudyData(userId) {
  const today = new Date();

  const todayKey = today.toDateString();

  const todayMinutes =
    Number(
      localStorage.getItem(
        `studyMinutesToday_${userId}`
      )
    ) || 0;

  const currentStreak =
    Number(
      localStorage.getItem(
        `streak_${userId}`
      )
    ) || 0;

  const longestStreak =
    Number(
      localStorage.getItem(
        `longestStreak_${userId}`
      )
    ) || currentStreak;

  const weekMinutes =
    Number(
      localStorage.getItem(
        `studyWeek_${userId}`
      )
    ) || todayMinutes;

  const monthMinutes =
    Number(
      localStorage.getItem(
        `studyMonth_${userId}`
      )
    ) || todayMinutes;

  const totalMinutes =
    Number(
      localStorage.getItem(
        `studyTotal_${userId}`
      )
    ) || monthMinutes;

  const goalMinutes =
    Number(
      localStorage.getItem(
        `goalMinutes_${userId}`
      )
    ) || 180;

  const history =
    JSON.parse(
      localStorage.getItem(
        `studyHistory_${userId}`
      )
    ) || [];

  return {
    todayKey,
    todayMinutes,
    currentStreak,
    longestStreak,
    weekMinutes,
    monthMinutes,
    totalMinutes,
    goalMinutes,
    history,
  };
}