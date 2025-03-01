import { useSelector } from "react-redux";
import SearchResultItem from "../search/SearchResultsItem";
import { TopicItemType } from "../../types";
import { RootState } from "../../store";
import { useGetTheGuardianArticlesQuery } from "../../store/topics/topicsApiSlice";
import Loading from "../ui/Loading";
import ErrorComp from "../ui/ErrorComp";

const Liked = () => {
  const { liked } = useSelector((state: RootState) => state.user);

  const fetchableLikes: string[] = liked.filter(
    (item) => typeof item === "string"
  );

  const nonFetchableLikes: TopicItemType[] = liked.filter(
    (item) => typeof item !== "string"
  );

  const { data, error, isLoading } = useGetTheGuardianArticlesQuery({
    topics: [""],
    ids: fetchableLikes,
    fromUser: true,
  });

  const finalData = data ? data.concat(nonFetchableLikes) : nonFetchableLikes;
    return (
    <div>
      <h3>Liked</h3>

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
