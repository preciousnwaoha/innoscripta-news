import { useSelector } from "react-redux";
import { RootState } from "../../store";

const SearchFilters = () => {
  const { searchFilters, } = useSelector(
    (state: RootState) => state.topics
  );

  return <div>
    {/* Search Filters */}
    <h2>Search Filters</h2>
    <div>
      <label htmlFor="dateFrom">From:</label>
      <input type="date" id="dateFrom" value={searchFilters.dateFrom} />
    </div>
  </div>;
};

export default SearchFilters;
