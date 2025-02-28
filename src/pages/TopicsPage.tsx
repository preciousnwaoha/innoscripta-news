import TopicItem from "../components/TopicItem";
import { TopicItemType } from "../types";

const TopicsPage = () => {
  const items: TopicItemType[] = [];

  return (
    <div>
      <h1>Topics</h1>

      <ul>
        {items.map((topicItem) => (
          <TopicItem key={topicItem.id} item={topicItem} />
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;
