import Topic from "../components/Topic";
import { TopicItemType } from "../types";

const topicItems: TopicItemType[] = [
  {
    id: 1,
    name: "Topic 1",
    description: "Description 1",
    image: "https://example.com/topic1.png",
    datetime: "2021-01-01T00:00:00Z",

    source: {
      name: "Source 1",
      url: "https://example.com/source1",
      image: "https://example.com/source1.png",
      author: {
        name: "Author 1",
        url: "https://example.com/author1",
        image: "https://example.com/author1.png",
      },
    },
  },
];

const TopicsPage = () => {
  

  return (
    <div>
      <h1>Topics</h1>

      <div>
        <Topic items={topicItems} />
      </div>
    </div>
  );
};

export default TopicsPage;
