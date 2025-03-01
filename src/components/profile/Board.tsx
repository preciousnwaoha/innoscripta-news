import { useSelector } from "react-redux";
import SearchResultItem from "../search/SearchResultsItem";
import { TopicItemType } from "../../types";
import { RootState } from "../../store";
import { useGetTheGuardianArticlesQuery } from "../../store/topics/topicsApiSlice";
import ErrorComp from "../ui/ErrorComp";
import Loading from "../ui/Loading";

const Liked = () => {
  const { board } = useSelector((state: RootState) => state.user);

  const fetchableBoard: string[] = board.filter(
    (item) => typeof item === "string"
  );

  const nonFetchableBoard: TopicItemType[] = board.filter(
    (item) => typeof item !== "string"
  );

  const { data, error, isLoading } = useGetTheGuardianArticlesQuery({
    topics: [""],
    ids: fetchableBoard,
    fromUser: true,
  });

  const finalData = data ? data.concat(nonFetchableBoard) : nonFetchableBoard;

  return (
    <div>
      <h3>Saved topics</h3>

      {isLoading && <Loading />}
      {error && <ErrorComp message={`Error ${error}`} />}
      {!finalData && <ErrorComp message={"No results found"} type="normal" />}

      {!isLoading && !error && finalData && (
        <ul className="results-list">
          {finalData.map((result, index) => (
            <SearchResultItem key={index} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Liked;
