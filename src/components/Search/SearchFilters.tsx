import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "./SearchFilters.css";
import DateRangePicker from "../ui/DatePicker";
import Checkbox from "../ui/Checkbox";
import { updateSearchFilters } from "../../store/topics/topicsSlice";
import Select from "../ui/Select";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const SearchFilters = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState<null | number>(null);
  const { searchFilters, searchResults } = useSelector(
    (state: RootState) => state.topics
  );
  const todayString = new Date().toISOString().split("T")[0];
  const weekAgoString = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const monthAgoString = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const dateFrom = searchFilters.dateFrom || todayString;
  const dateTo = searchFilters.dateTo || todayString;

  const allCategories = searchResults.reduce((acc, result) => {
    return acc.concat(result.categories);
  }, [] as string[]);

  const allSources = searchResults.reduce((acc, result) => {
    return acc.concat(result.source.name);
  }, [] as string[]);

  const handleChangeFrom = (date: Date) => {
    dispatch(
      updateSearchFilters({
        ...searchFilters,
        dateFrom: date.toISOString(),
      })
    );
  };

  const handleChangeTo = (date: Date) => {
    dispatch(
      updateSearchFilters({
        ...searchFilters,
        dateTo: date.toISOString(),
      })
    );
  };

  const handleOpenGroupOnMobile = (index: number | null) => {
    setOpened(index);
  };

  return (
    <div className="search-filters">
      {/* Search Filters */}
      <h2>Search Filters</h2>

      <div className="filter-group">
        <h3 onClick={() => handleOpenGroupOnMobile(opened === 1 ? null : 1)}>
          Categories
          {opened === 1 ? (
            <BsChevronUp className="icon" />
          ) : (
            <BsChevronDown className="icon" />
          )}
        </h3>
        <div
          className={
            opened === 1
              ? "opened filter-group-content"
              : "filter-group-content"
          }
        >
          <Checkbox
            label="All"
            checked={searchFilters.categories.length === 0}
            onChange={(checked) => {
              if (checked) {
                dispatch(
                  updateSearchFilters({
                    ...searchFilters,
                    categories: [],
                  })
                );
              }
            }}
          />
          {Array.from(new Set(allCategories)).map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={searchFilters.categories.includes(category)}
              onChange={(checked) => {
                if (checked) {
                  dispatch(
                    updateSearchFilters({
                      ...searchFilters,
                      categories: [...searchFilters.categories, category],
                    })
                  );
                } else {
                  dispatch(
                    updateSearchFilters({
                      ...searchFilters,
                      categories: searchFilters.categories.filter(
                        (c) => c !== category
                      ),
                    })
                  );
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="filter-group sort-by">
        <h3>Sort By</h3>

        <Select
          options={[
            { value: "relevance", label: "Relevance" },
            { value: "date", label: "Date" },
            { value: "popularity", label: "Popularity" },
          ]}
          value={searchFilters.sortBy}
          onChange={(e) => {
            dispatch(
              updateSearchFilters({
                ...searchFilters,
                sortBy: e.target.value,
              })
            );
          }}
        />
      </div>

      <div className="filter-group">
        <h3 onClick={() => handleOpenGroupOnMobile(opened === 2 ? null : 2)}>
          Source
          {opened === 2 ? (
            <BsChevronUp className="icon" />
          ) : (
            <BsChevronDown className="icon" />
          )}
        </h3>

        <div
          className={
            opened === 2
              ? "opened filter-group-content"
              : "filter-group-content"
          }
        >
          <Checkbox
            label="All"
            checked={searchFilters.sources.length === 0}
            onChange={(checked) => {
              if (checked) {
                dispatch(
                  updateSearchFilters({
                    ...searchFilters,
                    sources: [],
                  })
                );
              }
            }}
          />

          {Array.from(new Set(allSources)).map((source) => (
            <Checkbox
              key={source}
              label={source}
              checked={searchFilters.sources.includes(source)}
              onChange={(checked) => {
                if (checked) {
                  dispatch(
                    updateSearchFilters({
                      ...searchFilters,
                      sources: [...searchFilters.sources, source],
                    })
                  );
                } else {
                  dispatch(
                    updateSearchFilters({
                      ...searchFilters,
                      sources: searchFilters.sources.filter(
                        (s) => s !== source
                      ),
                    })
                  );
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 onClick={() => handleOpenGroupOnMobile(opened === 3 ? null : 3)}>
          Date Range
          {opened === 3 ? (
            <BsChevronUp className="icon" />
          ) : (
            <BsChevronDown className="icon" />
          )}
        </h3>

        <div
          className={
            opened === 3
              ? "opened filter-group-content"
              : "filter-group-content"
          }
        >
          <Checkbox
            label="From Today"
            checked={dateFrom === todayString}
            onChange={(checked) => {
              if (checked) {
                dispatch(
                  updateSearchFilters({
                    ...searchFilters,
                    dateFrom: todayString,
                  })
                );
              }
            }}
          />
          <Checkbox
            label="From a Week Ago"
            checked={dateFrom === weekAgoString}
            onChange={(checked) => {
              if (checked) {
                dispatch(
                  updateSearchFilters({
                    ...searchFilters,
                    dateFrom: weekAgoString,
                  })
                );
              }
            }}
          />

          <Checkbox
            label="From a Month Ago"
            checked={dateFrom === monthAgoString}
            onChange={(checked) => {
              if (checked) {
                dispatch(
                  updateSearchFilters({
                    ...searchFilters,
                    dateFrom: monthAgoString,
                  })
                );
              }
            }}
          />

          <DateRangePicker
            className="date-range-picker"
            fromDate={new Date(dateFrom)}
            toDate={new Date(dateTo)}
            onFromDateChange={(date) => {
              if (date) {
                handleChangeFrom(date);
              }
            }}
            onToDateChange={(date) => {
              if (date) {
                handleChangeTo(date);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
