import { TopicItemType } from "../types";
import Card from "./ui/Card";
import "./TopicItem.css";

interface TopicItemProps {
  topic: TopicItemType;
}

const TopicItem = ({ topic }: TopicItemProps) => {
  return (
    <li className="topic-item">
      <Card className="topic-item-card">
        <a href={topic.url} target="_blank">
          <img src={topic.image} alt={topic.title} />
        </a>

        <p className="date">{topic.datetime}</p>
        <a href={topic.url} target="_blank">
          <h2>{topic.title}</h2>
        </a>

        <h5 className="byline">{topic.author.name}</h5>
        <a href={topic.url} target="_blank">
          <p className="description">{topic.description} ...</p>
        </a>

        <div className="source">
          <a href={topic.source.url} target="_blank">
            {topic.source.image && (
              <img src={topic.source.image} alt={topic.source.name} />
            )}
            <h4>{topic.source.name}</h4>
          </a>
        </div>
      </Card>
    </li>
  );
};

export default TopicItem;
