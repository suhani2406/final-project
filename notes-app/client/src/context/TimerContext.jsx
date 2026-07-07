import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TimerContext = createContext();

const FOCUS_TIME = 30 * 60;
const BREAK_TIME = 10 * 60;

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const secondsIntoMinute = useRef(0); // tracks partial-minute progress

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return user.id || "guest";
  };

  const getWeekKey = () => {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${week}`;
  };

  const ensureFreshDay = useCallback((userId) => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(`studySavedDate_${userId}`);
    if (savedDate !== today) {
      localStorage.setItem(`studyMinutesToday_${userId}`, "0");
      localStorage.setItem(`studySavedDate_${userId}`, today);
    }
  }, []);

  const ensureFreshWeek = useCallback((userId) => {
    const weekKey = getWeekKey();
    const savedWeek = localStorage.getItem(`studyWeekKey_${userId}`);
    if (savedWeek !== weekKey) {
      localStorage.setItem(`studyWeek_${userId}`, "0");
      localStorage.setItem(`studyWeekKey_${userId}`, weekKey);
    }
  }, []);

  // NEW: credit exactly 1 minute, called every 60s of active focus time
  const creditOneMinute = useCallback(() => {
    const userId = getUserId();
    ensureFreshDay(userId);
    ensureFreshWeek(userId);

    const todayMinutes = Number(localStorage.getItem(`studyMinutesToday_${userId}`)) || 0;
    localStorage.setItem(`studyMinutesToday_${userId}`, todayMinutes + 1);

    const weekMinutes = Number(localStorage.getItem(`studyWeek_${userId}`)) || 0;
    localStorage.setItem(`studyWeek_${userId}`, weekMinutes + 1);

    localStorage.setItem(`lastStudy_${userId}`, new Date().toDateString());

    window.dispatchEvent(new Event("study-data-updated"));
  }, [ensureFreshDay, ensureFreshWeek]);

  const bumpStreak = useCallback((userId) => {
    const today = new Date().toDateString();
    const lastKey = `lastStreakDate_${userId}`;
    const streakKey = `streak_${userId}`;
    const longestKey = `longestStreak_${userId}`;

    const lastDate = localStorage.getItem(lastKey);
    if (lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastDate === yesterday.toDateString();

    const currentStreak = wasYesterday
      ? Number(localStorage.getItem(streakKey) || 0) + 1
      : 1;

    const longest = Math.max(currentStreak, Number(localStorage.getItem(longestKey) || 0));

    localStorage.setItem(streakKey, String(currentStreak));
    localStorage.setItem(longestKey, String(longest));
    localStorage.setItem(lastKey, today);
  }, []);

  // Called once a full 30-min block completes: streak only (minutes already credited live)
  const completeFocusBlock = useCallback(() => {
    const userId = getUserId();
    bumpStreak(userId);
    window.dispatchEvent(new Event("study-data-updated"));
  }, [bumpStreak]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (!isBreak) {
          secondsIntoMinute.current += 1;
          if (secondsIntoMinute.current >= 60) {
            secondsIntoMinute.current = 0;
            creditOneMinute();
          }
        }

        if (prev <= 1) {
          if (!isBreak) {
            completeFocusBlock();
            secondsIntoMinute.current = 0;
            setIsBreak(true);
            return BREAK_TIME;
          }
          setRunning(false);
          setIsBreak(false);
          return FOCUS_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, isBreak, creditOneMinute, completeFocusBlock]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        running,
        isBreak,
        setRunning,
        setSeconds,
        setIsBreak,
        FOCUS_TIME,
        BREAK_TIME,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);