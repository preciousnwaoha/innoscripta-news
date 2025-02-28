import { useSelector } from "react-redux";
import SearchFilters from "../components/Search/SearchFilters";
import { RootState } from "../store";
import Header from "../components/Header";

const SearchResults = () => {
  const { searchResults, searchStates } = useSelector(
    (state: RootState) => state.topics
  );

  const { query, isLoading, error } = searchStates;

  if (!query) {
    return (
      <div>
        <h1>Search Results</h1>
        <p>No search query provided</p>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <Header />
      <h1>Search Results for: {query}</h1>
      <p>{searchResults.length} results found</p>

      <div className="splitter">
        <SearchFilters />

        <div className="search-results">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!isLoading && !error && (
            <>
              <p>
                We're working continuously to improve our search results. If you
                aren't finding what you expect, please use our feedback form to
                share the search query and expected result with us so we can
                improve.
              </p>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
