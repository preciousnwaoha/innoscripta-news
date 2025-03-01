import { useDispatch, useSelector } from "react-redux";
import SearchFilters from "../components/search/SearchFilters";
import { RootState } from "../store";
import Header from "../components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchResultsPage.css";
import SearchResultItem from "../components/search/SearchResultsItem";
import Loading from "../components/ui/Loading";
import ErrorComp from "../components/ui/ErrorComp";
import useGetTopicsAggregate from "../hooks/useGetTopicsAggregate";
import { updateSearchResults } from "../store/topics/topicsSlice";
import { useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
// import Breadcrumb from "../components/ui/Breadcrum";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchFilters, searchResults } = useSelector(
    (state: RootState) => state.topics
  );

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { dateFrom, dateTo, sortBy, page, pageSize, categories, sources } =
    searchFilters;

  const { data, error, allErrors, isLoading } = useGetTopicsAggregate({
    topics: [query],
    to: dateTo,
    from: dateFrom,
    sortBy,
    pageSize,
    page,
  });

  // When new data arrives, update the Redux state with the fetched results.
  useEffect(() => {
    if (data) {
      dispatch(updateSearchResults(data));
    }
  }, [data, dispatch]);

  if (!query) {
    return (
      <div>
        <h1>Search Results</h1>
        <p>No search query provided</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  let filteredResult = [...searchResults];
  if (categories.length > 0) {
    filteredResult = filteredResult.filter((result) =>
      result.categories.some((category) => categories.includes(category))
    );
  }
  if (sources.length > 0) {
    filteredResult = filteredResult.filter((result) =>
      sources.includes(result.source.name)
    );
  }

  return (
    <div className="search-results-page">
      <Header />

      {/* <Breadcrumb /> */}
      <div onClick={handleBack} className="back-link-container">
        <HiArrowLongLeft />{" "}
        <span className="back-link">Back to previous page</span>
      </div>

      <h1>Search Results for: {query}</h1>
      <p>{filteredResult ? filteredResult.length : 0} results found</p>

      <div className="search-results-page-splitter">
        <SearchFilters />

        <div className="search-results">
          {isLoading && <Loading />}
          {allErrors && <ErrorComp message={`Error ${error}`} />}
          {!filteredResult && (
            <ErrorComp message={"No results found"} type="normal" />
          )}

          {!isLoading && !allErrors && filteredResult && (
            <>
              <p>
                We're working continuously to improve our search results. If you
                aren't finding what you expect, please use our feedback form to
                share the search query and expected result with us so we can
                improve.
              </p>
              <ul className="results-list">
                {filteredResult.map((result, index) => (
                  <SearchResultItem
                    key={index}
                    result={result}
                    fullWidth={true}
                  />
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
