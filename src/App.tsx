import { useState, useRef, type ChangeEvent } from "react";
import useOffline from "./hooks/useOffline";
import useClipboard from "./hooks/useClipboard";
import useFetch from "./hooks/useFetch";
import useForm from "./hooks/useForm";
import useUndoRedo from "./hooks/useUndoRedo";
import useToggle from "./hooks/useToggle";
import useSessionStorage from "./hooks/useSessionStorage";
import useResetState from "./hooks/useResetState";
import useIdle from "./hooks/useIdle";
import useKeyPress from "./hooks/useKeyPress";
import useLocalStorage from "./hooks/useLocalStorage";
import useOnClickOutside from "./hooks/useOnClickOutside";
import usePrevious from "./hooks/usePrevious";
import useLongPressed from "./hooks/useLongPressed";
import useLongPressToAccelerate from "./hooks/useLongPressToAccelerate";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const isOffline = useOffline();
  const { copy, copied } = useClipboard();
  const attr1 = useLongPressed(() => console.log("hello"));
  const attr2 = useLongPressToAccelerate(() => console.log("hello"));
  const { data, error, isLoading, refetch } = useFetch<User[]>({
    fn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    enabled: true,
  });

  const { values, handleChange, handleSubmit, resetForm } = useForm<{
    text: string;
  }>({
    initialValues: { text: "" },
    onSubmit: (values) => {
      copy(values.text);
      alert("Text copied to clipboard!");
      resetForm();
    },
  });

  const [undoRedoValue, setUndoRedoValue, undo, redo] = useUndoRedo<string>("");

  const [toggleValue, toggle, setToggleValue] = useToggle();
  const [sessionValue, setSessionValue, removeSessionValue] = useSessionStorage(
    "myNumber",
    0
  );
  const [resetStateValue, setResetStateValue, resetState] =
    useResetState<number>(0);

  const isIdle = useIdle(5000);
  const aKeyPressed = useKeyPress("a");

  const [localValue, setLocalValue, removeLocalValue] = useLocalStorage(
    "myLocalNumber",
    0
  );

  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({
    ref: boxRef,
    callBackFn: () => setIsBoxVisible(false),
  });

  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  function handleToggleChange(e: ChangeEvent<HTMLInputElement>) {
    setToggleValue(e.target.checked);
  }

  function handleSessionChange(e: ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (!isNaN(val)) setSessionValue(val);
  }

  function handleResetStateChange(e: ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (!isNaN(val)) setResetStateValue(val);
  }

  function handleLocalChange(e: ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (!isNaN(val)) setLocalValue(val);
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-md font-sans">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Custom Hooks Visualization
      </h1>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Offline Status
        </h2>
        <p
          className={`font-bold ${
            isOffline ? "bg-[#2A7B9B]" : "text-green-600"
          }`}
        >
          {isOffline ? "You are currently offline." : "You are online."}
        </p>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Clipboard</h2>
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <input
            type="text"
            value={values.text}
            onChange={(e) => handleChange({ text: e.target.value })}
            placeholder="Type text to copy"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!values.text.trim()}
            className={`px-5 py-2 rounded-md text-white text-lg transition-colors ${
              values.text.trim()
                ? "bg-[#2A7B9B] hover:bg-[#205D75] cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Copy
          </button>
        </form>
        {copied && (
          <p className="text-green-600 font-semibold mt-2">
            Copied to clipboard!
          </p>
        )}
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Fetch Users
        </h2>
        {isLoading && <p>Loading users...</p>}
        {error && <p className="text-[#2A7B9B]">Error: {error.message}</p>}
        {data && (
          <ul className="mt-3 space-y-2 list-none p-0">
            {data.map((user) => (
              <li key={user.id} className="bg-white rounded-md p-3 shadow-sm">
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={refetch}
          className="mt-4 px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
        >
          Refetch Users
        </button>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Undo / Redo
        </h2>
        <input
          type="text"
          value={undoRedoValue}
          onChange={(e) => setUndoRedoValue(e.target.value)}
          placeholder="Type something..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={undo}
            className="px-5 py-2 rounded-md text-white text-lg bg-[#2A7B9B] hover:bg-[#205D75]cursor-pointer"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="px-5 py-2 rounded-md text-white text-lg bg-[#2A7B9B] hover:bg-[#205D75] cursor-pointer"
          >
            Redo
          </button>
        </div>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Toggle</h2>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!toggleValue}
            onChange={handleToggleChange}
            className="w-5 h-5"
          />
          <span className="text-lg font-semibold">
            {toggleValue ? "ON" : "OFF"}
          </span>
        </label>
        <button
          onClick={toggle}
          className="mt-3 px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
        >
          Toggle
        </button>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Session Storage
        </h2>
        <input
          type="number"
          value={sessionValue}
          onChange={handleSessionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setSessionValue(sessionValue + 1)}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Increment
          </button>
          <button
            onClick={removeSessionValue}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Reset State
        </h2>
        <input
          type="number"
          value={resetStateValue}
          onChange={handleResetStateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setResetStateValue(resetStateValue + 1)}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Increment
          </button>
          <button
            onClick={resetState}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Idle Detection
        </h2>
        <p
          className={`font-bold ${
            isIdle ? "text-[#2A7B9B]" : "text-[#205D75]"
          }`}
        >
          {isIdle ? "User is idle" : "User is active"}
        </p>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Key Press ("a")
        </h2>
        <p
          className={`font-bold ${
            aKeyPressed ? "text-green-600" : "text-[#2A7B9B]"
          }`}
        >
          {aKeyPressed ? '"a" key is pressed' : '"a" key is NOT pressed'}
        </p>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Local Storage
        </h2>
        <input
          type="number"
          value={localValue}
          onChange={handleLocalChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setLocalValue(localValue + 1)}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Increment
          </button>
          <button
            onClick={removeLocalValue}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Click Outside
        </h2>
        {isBoxVisible ? (
          <div
            ref={boxRef}
            className="p-5 bg-[#2A7B9B] text-white rounded-lg select-none cursor-default max-w-md"
          >
            Click outside me to hide me!
          </div>
        ) : (
          <button
            onClick={() => setIsBoxVisible(true)}
            className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
          >
            Show Box
          </button>
        )}
      </section>

      <section className="mb-10 pb-5 border-b border-gray-300">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Previous State
        </h2>
        <p>
          Current count: <strong>{count}</strong>
        </p>
        <p>
          Previous count:{" "}
          <strong>
            {prevCount !== null && prevCount !== undefined ? prevCount : "N/A"}
          </strong>
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-3 px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
        >
          Increment Count
        </button>
      </section>
      <section className="mb-10 pb-5 border-b border-gray-300">
        <button
          {...attr1}
          className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
        >
          LongPressedButton
        </button>
      </section>
      <section className="mb-10 pb-5 border-b border-gray-300">
        <button
          {...attr2}
          className="px-5 py-2 bg-[#2A7B9B] hover:bg-[#205D75] text-white rounded-md"
        >
          LongPressToAccelerateButton
        </button>
      </section>
      
    </div>
  );
}

export default App;
