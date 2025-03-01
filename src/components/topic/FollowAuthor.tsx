import { TopicItemType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addAuthor, removeAuthor } from "../../store/userSlice";
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import "./FollowAuthor.css";

interface FollowAuthorProps {
  topic: TopicItemType;
}

const FollowAuthor = ({ topic }: FollowAuthorProps) => {
  const dispatch = useDispatch();
  const { authors } = useSelector((state: RootState) => state.user);

  const authorIsFollowed = authors.includes(topic.author.name);
  // const authorIsFollowed = authors.includes(topic.author.name);

  const toggleFollow = () => {
    if (authorIsFollowed) {
      dispatch(removeAuthor(topic.author.name));
      return;
    }
    dispatch(addAuthor(topic.author.name));
  };

  if (!topic.author.name) {
    return null;
  }

  return (
    <div className="author">
      <h5 className="byline">{topic.author.name}</h5>
      <p onClick={toggleFollow} className="follow-author">
        {authorIsFollowed ? " - Following" : " - Follow"}
        <span>
          {authorIsFollowed ? <RiUserFollowLine /> : <RiUserUnfollowLine />}
        </span>
      </p>
    </div>
  );
};

export default FollowAuthor;
