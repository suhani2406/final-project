export default function FoldersPanel({
  folders,
  activeFolder,
  setActiveFolder,
}) {

  return (
    <div
      className="
      w-[240px]
      bg-white/20
bg-[#1e293b]
      rounded-3xl
      p-5
      border border-white/10
      h-fit
    "
    >

      <h2 className="text-2xl font-bold mb-5">
        Folders 📁
      </h2>

      <div className="flex flex-col gap-3">

        <button
          onClick={() => setActiveFolder("All")}
          className={`
            p-3
            rounded-2xl
            text-left
            transition
            ${
              activeFolder === "All"
                ? "bg-[#9d5c4d] text-white"
                : "bg-white/20"
            }
          `}
        >
          All Notes
        </button>

        {folders.map((folder, i) => (

          <button
            key={i}
            onClick={() => setActiveFolder(folder)}
            className={`
              p-3
              rounded-2xl
              text-left
              transition
              ${
                activeFolder === folder
                  ? "bg-[#9d5c4d] text-white"
                  : "bg-white/20"
              }
            `}
          >
            {folder}
          </button>

        ))}

      </div>

    </div>
  );
}