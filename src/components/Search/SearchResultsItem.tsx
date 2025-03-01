import { TopicItemType } from "../../types";
import "./SearchResultItem.css";
import LikeAndSave from "../topic/LikeAndSave";
import Source from "../topic/Source";
import { timeAgo } from "../../utils";
import FollowAuthor from "../topic/FollowAuthor";

interface SearchResultItemProps {
  result: TopicItemType;
  fullWidth?: boolean;
}

const SearchResultItem = ({
  result,
  fullWidth = false,
}: SearchResultItemProps) => {
  return (
    <li className={`search-result-item ${fullWidth ? "full-width" : ""}`}>
      {result.image && (
        <div className="image">
          <a href={result.url} target="_blank">
            <img src={result.image} alt={result.title} />
          </a>
        </div>
      )}

      <div className="content">
        <div className="date-actions">
          <p className="date">{timeAgo(result.datetime)}</p>
          <LikeAndSave topic={result} className="inline" />
        </div>
        <a href={result.url} target="_blank">
          <h3>{result.title}</h3>
        </a>

        <Source topic={result} />
        <FollowAuthor topic={result} />

        <a href={result.url} target="_blank">
          <p className="description">{result.description} ...</p>
        </a>
      </div>
    </li>
  );
};

export default SearchResultItem;
