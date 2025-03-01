import { TopicItemType } from "../../types";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { TbBookmark, TbBookmarkFilled } from "react-icons/tb";
import Icon from "../ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addToBoard,
  addToLiked,
  removeFromBoard,
  removeFromLiked,
} from "../../store/userSlice";
import "./LikeAndSave.css";
import { Link } from "react-router-dom";

interface LikeAndSaveProps {
  topic: TopicItemType;
  className?: string;
}

const LikeAndSave = ({ topic, className }: LikeAndSaveProps) => {
  const dispatch = useDispatch();
  const { liked, board } = useSelector((state: RootState) => state.user);

  const likedFromGuadian: string[] = liked.filter(
    (item) => typeof item === "string"
  );
  const otherLikes: TopicItemType[] = liked.filter(
    (item) => typeof item !== "string"
  );
  const itemIsLiked =
    otherLikes.find((item) => item.id === topic.id) ||
    likedFromGuadian.includes(topic.id);

  const boardFromGuadian: string[] = board.filter(
    (item) => typeof item === "string"
  );
  const otherBoard: TopicItemType[] = board.filter(
    (item) => typeof item !== "string"
  );
  const itemIsSaved =
    otherBoard.find((item) => item.id === topic.id) ||
    boardFromGuadian.includes(topic.id);

  const toggleLike = () => {
    if (itemIsLiked) {
      dispatch(removeFromLiked(topic.id));
      return;
    }
    dispatch(addToLiked(topic.apiSource === "theguardian" ? topic.id : topic));
  };

  const toggleSave = () => {
    if (itemIsSaved) {
      dispatch(removeFromBoard(topic.id));
      return;
    }
    dispatch(addToBoard(topic.apiSource === "theguardian" ? topic.id : topic));
  };

  return (
    <div className={`like-and-save ${className}`}>
      <Icon
        onClick={toggleLike}
        className={`like-icon ${itemIsLiked ? "active" : ""}`}
        icon={itemIsLiked ? <IoHeartSharp /> : <IoHeartOutline />}
      />

      {topic.content && <Link to={`/article/${topic.id}`} >
        <button className="read-more">
        Read More
        </button>
        
      </Link>}

      <Icon
        onClick={toggleSave}
        className={`save-icon ${itemIsSaved ? "active" : ""}`}
        icon={itemIsSaved ? <TbBookmarkFilled /> : <TbBookmark />}
      />
    </div>
  );
};

export default LikeAndSave;
