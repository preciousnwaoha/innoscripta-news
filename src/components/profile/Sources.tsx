import { useSelector } from "react-redux";
import SearchResultItem from "../search/SearchResultsItem";
import { TopicsQueryParams } from "../../types";
import { RootState } from "../../store";
import useGetTopicsAggregate from "../../hooks/useGetTopicsAggregate";
import Loading from "../ui/Loading";
import ErrorComp from "../ui/ErrorComp";

const Liked = () => {
  const { sources } = useSelector((state: RootState) => state.user);


  const queryParamsContruct: TopicsQueryParams = {
    topics: sources,
    fromUser: true,
  }

  const { data, error, allErrors, isLoading } = useGetTopicsAggregate(queryParamsContruct);

  
  return (
    <div>
      <h3>Sources</h3>

      {isLoading && <Loading />}
      {allErrors && <ErrorComp message={`Error ${error}`} />}
      {!data && <ErrorComp message={"No results found"} type="normal" />}

      {!isLoading && !allErrors && data && (
        <ul className="results-list">
          {data.map((result, index) => (
            <SearchResultItem key={index} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Liked;
