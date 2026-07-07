const motivationData = [
  {
    image:
      "https://thumbs.dreamstime.com/b/serene-study-session-anime-girl-studying-desk-laptop-headphones-anime-girl-studying-her-desk-sunlit-room-351600178.jpg?w=992",
    title: "Today's Focus ✨",
    quote: "Small progress every day leads to big results.",
    sub: "Keep going, you're doing great!",
  },

  {
    image:
      "https://wallpaperaccess.com/full/8351146.jpg",
    title: "Believe 🌸",
    quote: "Success is built from tiny victories repeated daily.",
    sub: "Trust the process.",
  },

  {
    image:
      "https://wallpapers.com/images/hd/boy-studying-with-moonlight-study-aesthetic-na9lvbq3o682akx9.jpg",
    title: "Keep Building 🚀",
    quote: "Discipline will carry you when motivation disappears.",
    sub: "One more session today.",
  },

  {
    image:
      "https://wallpaperaccess.com/full/2870035.jpg",
    title: "Dream Bigger ☁️",
    quote: "The future depends on what you do today.",
    sub: "Don't stop now.",
  },

  {
    image:
      "https://i.pinimg.com/originals/a7/f7/0b/a7f70b0e09b4e48ded3a11786d583385.png",
    title: "One Step More 💙",
    quote: "Consistency beats intensity.",
    sub: "Just keep showing up.",
  },

  {
    image:
      "https://i.pinimg.com/originals/e6/8a/b9/e68ab92e28fa048b398cb5ba76cca8c1.jpg",
    title: "You're Growing 🌼",
    quote: "Every expert was once a beginner.",
    sub: "Be proud of today's effort.",
  },
];

export default function MotivationCarousel() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userId = user.id || "guest";

  const streak =
    Number(
      localStorage.getItem(`streak_${userId}`)
    ) || 0;

  const today = new Date().getDate();

  const current =
    motivationData[today % motivationData.length];

  return {
    ...current,
    streak,
    slide:
      (today % motivationData.length) + 1,
    total: motivationData.length,
  };
}