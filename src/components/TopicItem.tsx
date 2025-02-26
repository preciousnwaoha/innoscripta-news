import { useEffect } from "react";
import { TopicItemType } from "../types";
import { useParams } from "react-router-dom";

interface TopicItemProps {
  item: TopicItemType;
}

const TopicItem = ({ item }: TopicItemProps) => {
    const { id } = useParams()
    // const [topic, setTopic] = useState<TopicItemType | null>(null)

    console.log(id)

    useEffect(() => {
        // Fetch data from an API
      }, [id]);

  return (
    <li>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <img src={item.image} alt={item.name} />
      <p>{item.datetime}</p>

      <h3>Source</h3>
      <a href={item.source.url} target="_blank">
        <img src={item.source.image} alt={item.source.name} />
      </a>
      <h4>{item.source.name}</h4>
      <a href={item.source.author.url} target="_blank">
        <img
          src={item.source.author.image}
          alt={item.source.author.name}
        />
      </a>
      <h5>{item.source.author.name}</h5>
    </li>
  );
};

export default TopicItem;
