import { TopicItemType } from "../../types";
import { IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";
import Icon from "../ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addSource, removeSource } from "../../store/userSlice";

interface SourceProps {
  topic: TopicItemType;
}

const Source = ({ topic }: SourceProps) => {
  const dispatch = useDispatch();
  const { sources } = useSelector((state: RootState) => state.user);

  const sourceIsFollowed = sources.includes(topic.source.name);
  // const authorIsFollowed = authors.includes(topic.author.name);

  const toggleFollowSource = () => {
    if (sourceIsFollowed) {
      dispatch(removeSource(topic.source.name));
      return;
    }
    dispatch(addSource(topic.source.name));
  };

  return (
    <div className="source">
      <a href={topic.source.url} target="_blank" className="source-link">
        {topic.source.image && (
          <img src={topic.source.image} alt={topic.source.name} />
        )}
        <h4>{topic.source.name}</h4>
      </a>

      <Icon
        key={topic.source.name}
        onClick={toggleFollowSource}
        className={`follow-icon ${sourceIsFollowed ? "active" : ""}`}
        icon={sourceIsFollowed ? <IoIosAddCircle /> : <IoIosAddCircleOutline />}
      />
    </div>
  );
};

export default Source;
