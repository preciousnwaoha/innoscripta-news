import { TopicItemType } from "../types";
import TopicItem from "./TopicItem";

interface TopicProps {
  items: TopicItemType[];
}

const Topic = ({ items }: TopicProps) => {
  return (
    <div>
      <h1>Topic</h1>

      <ul>
        {items.map((topicItem) => (
          <TopicItem key={topicItem.id} item={topicItem} />
        ))}
      </ul>
    </div>
  );
};

export default Topic;
