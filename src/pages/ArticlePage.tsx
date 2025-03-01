import { Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useGetTheGuardianArticlesQuery } from "../store/topics/topicsApiSlice";
import Loading from "../components/ui/Loading";
import "./ArticlePage.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementReads } from "../store/userSlice";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { "*": articlePath } = useParams();

  const { data, isLoading } = useGetTheGuardianArticlesQuery({
    topics: [],
    ids: articlePath ? [articlePath] : [],
  });

  useEffect(() => {
    if (data && data.length) {
      dispatch(
        incrementReads()
      )
    }
  }, [data]);

 

  if (!data && !isLoading) {
    // Redirect to NotFoundPage if article data is missing
    return <Navigate to="/not-found" replace />;
  }


  


  return (
    <div className="article-page">
      <Header />
      <h1>{data ? data[0].title : "Not found"}</h1>
      {isLoading && <Loading />}

      {data && !isLoading && (
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: data[0].content || "" }}
        />
      )}
    </div>
  );
};

export default ArticlePage;
