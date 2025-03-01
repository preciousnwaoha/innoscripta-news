import { useDispatch } from "react-redux";
import { persistor } from "../../store"; // adjust the path as needed

const Preferences = () => {
  const dispatch = useDispatch();

  const clearAllData = async () => {
    // Reset in-memory Redux state by dispatching reset actions
    dispatch({ type: "user/reset" });
    dispatch({ type: "topics/reset" });
    dispatch({ type: "general/reset" });
    
    // Purge persisted data from localStorage
    await persistor.purge();
    
    // Optionally, you might trigger a re-render or further actions here
    console.log("Cleared persisted and in-memory state");
  };

  return (
    <div>
      <button onClick={clearAllData}>Clear All Data</button>
    </div>
  );
};

export default Preferences;
