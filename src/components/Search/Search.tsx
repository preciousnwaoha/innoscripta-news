import { useDispatch, useSelector } from "react-redux";
import { resetSearchFilters, updateSearchStates } from "../../store/topics/topicsSlice";
import "./Search.css";
import { RootState } from "../../store";
import { 
  // useLocation,
   useNavigate } from "react-router-dom";
// import { updateBreadcrumb } from "../../store/generalSlice";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const { searchStates } = useSelector((state: RootState) => state.topics);



  const {
    query: searchQuery,
    active: searchIsFocused,
    isLoading: _isLoading,
    error: _error,
  } = searchStates;

  const handleFocus = () => {
    dispatch(
      updateSearchStates({
        query: searchQuery,
        active: true,
        isLoading: _isLoading,
        error: _error,
      })
    );
  };

  const handleBlur = () => {
    dispatch(
      updateSearchStates({
        query: searchQuery,
        active: false,
        isLoading: _isLoading,
        error: _error,
      })
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch(
      updateSearchStates({
        query: e.target.value,
        active: searchIsFocused,
        isLoading: _isLoading,
        error: _error,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      resetSearchFilters()
    )
    // Navigate to a search results route with the query as a URL parameter.
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };


  return (
    <div className={`search ${searchIsFocused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for news..."
        />
      </form>
    </div>
  );
};

export default Search;
