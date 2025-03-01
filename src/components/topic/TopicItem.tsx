import { TopicItemType } from "../../types";
import "./TopicItem.css";
import { timeAgo } from "../../utils";
import LikeAndSave from "./LikeAndSave";
import Source from "./Source";
import FollowAuthor from "./FollowAuthor";

interface TopicItemProps {
  topic: TopicItemType;
}

const TopicItem = ({ topic }: TopicItemProps) => {
  return (
    <li className="topic-item">
      {topic.image && (
        <a href={topic.url} target="_blank">
          <img src={topic.image} alt={topic.title} />
        </a>
      )}

      <div className="topic-item-date-source">
        <p className="date">{timeAgo(topic.datetime)}</p>
        <Source topic={topic} />
      </div>
      <a href={topic.url} target="_blank">
        <h2>{topic.title}</h2>
      </a>

      <FollowAuthor topic={topic} />
      <a href={topic.url} target="_blank">
        <p className="description">{topic.description} ...</p>
      </a>

      {/* Action Icons */}
      <LikeAndSave topic={topic} />
    </li>
  );
};

export default TopicItem;
