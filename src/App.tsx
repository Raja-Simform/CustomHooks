
import useOffline from "./hooks/useOffline";


function App() {
  const isOffline = useOffline();
  console.log(isOffline);
  return (
    <div>
      {isOffline ? (
        <p>You are currently offline.</p>
      ) : (
        <p>You are online.</p>
      )}
    </div>
  );
}

export default App;
