import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateSeachStates,
  updateSearchResults,
} from "../../store/topics/topicsSlice";
import { useGetNewsAPIArticlesQuery } from "../../store/topics/topicsApiSlice";
import "./Search.css";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchFilters } = useSelector(
    (state: RootState) => state.topics
  );

  const { dateFrom, dateTo, sortBy, page, pageSize } = searchFilters;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  const {
    data,
    error: _error,
    isLoading: _isLoading,
  } = useGetNewsAPIArticlesQuery({
    topics: [searchQuery],
    to: dateTo,
    from: dateFrom,
    sortBy,
    pageSize,
    page,
  });

  useEffect(() => {
    dispatch(updateSearchResults(data));
    dispatch(
      updateSeachStates({
        active: searchIsFocused,
        isLoading: _isLoading,
        error: _error,
      })
    );
  }, [data, _error, _isLoading, dispatch, searchIsFocused]);

  const handleFocus = () => {
    setSearchIsFocused(true);
  };

  const handleBlur = () => {
    setSearchIsFocused(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
