import { useRef, useState } from "react";

export default function App() {
  const chapterDataRef = useRef<Map<number, any>>(new Map());

  const [chapters, setChapters] = useState(1);

  const [data, setData] = useState({
    standard: "",
    subject: "",
    description: "",
    chapters: [],
  });

  const submit = () => {
    const finalData = {
      ...data,
      chapters: Array.from(chapterDataRef.current).map(([_, value]) => value),
    };

    console.log(finalData);
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-1/3 border p-3">
        <input
          onChange={(e) => setData((data) => ({ ...data, standard: e.target.value }))}
          className="border w-full mb-5 p-2"
          placeholder="Standard"
        />
        <br />

        <input
          onChange={(e) => setData((data) => ({ ...data, subject: e.target.value }))}
          className="border w-full mb-5 p-2"
          placeholder="Subject"
        />
        <br />

        <input
          onChange={(e) => setData((data) => ({ ...data, description: e.target.value }))}
          className="border w-full mb-5 p-2"
          placeholder="Description"
        />

        {Array(chapters)
          .fill(0)
          .map((_, index) => (
            <div className="flex items-center gap-5 mb-3">
              <input
                onChange={(e) =>
                  chapterDataRef.current.set(index, {
                    chapter: e.target.value,
                    noOfPages: chapterDataRef.current.get(index)?.noOfPages || 0,
                  })
                }
                className="border w-full p-2"
                placeholder="Chapter Name"
              />

              <input
                onChange={(e) =>
                  chapterDataRef.current.set(index, {
                    chapter: chapterDataRef.current.get(index)?.chapter || "",
                    noOfPages: parseInt(e.target.value),
                  })
                }
                className="border w-full p-2"
                type="number"
                placeholder="No of Pages"
              />

              <button
                onClick={() => {
                  chapterDataRef.current.delete(index);
                  setChapters((chapters) => (chapters > 0 ? chapters - 1 : chapters));
                }}
                className="text-xl"
              >
                -
              </button>
            </div>
          ))}

        <button onClick={() => setChapters((chapters) => chapters + 1)} className="border px-5 py-1 mb-10">
          Add more +
        </button>

        <button onClick={submit} className="border w-full rounded py-2">
          Submit
        </button>
      </div>
    </section>
  );
}
