import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateBreadcrumb } from "../../store/generalSlice";
import { useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { breadcrumb } = useSelector((state: RootState) => state.general);

  const handleClick = (index: number) => {
    dispatch(updateBreadcrumb(breadcrumb.slice(0, index + 1)));

    navigate(breadcrumb[index].href || "/");
  };

  return (
    <div className="breadcrumb">
      {breadcrumb.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <span
              className="breadcrumb-link"
              onClick={() => handleClick(index)}
            >
              {item.label}
            </span>
          ) : (
            <span>{item.label}</span>
          )}
          {index < breadcrumb.length - 1 && <span> / </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
