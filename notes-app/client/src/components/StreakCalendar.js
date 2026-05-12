const days = [

  "M","T","W","T","F","S","S"

];

export default function StreakCalendar() {

  return (

    <div className="glass p-6">

      <h2 className="title mb-6">
        Study Streak 🔥
      </h2>

      <div className="grid grid-cols-7 gap-3">

        {days.map((day, index) => (

          <div
            key={index}
            className="
            h-14
            rounded-2xl
            bg-[#d96c52]
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
          >

            {day}

          </div>

        ))}

      </div>

      <div className="mt-6 text-lg">

        Current Streak:
        <span className="font-bold">
          {" "}12 Days
        </span>

      </div>

    </div>
  );
}