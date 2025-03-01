import { useSelector } from "react-redux";
import Header from "../components/Header";
import TopicItem from "../components/topic/TopicItem";
import Loading from "../components/ui/Loading";
import { RootState } from "../store";
import useGetTopicsAggregate from "../hooks/useGetTopicsAggregate";
import { TopicItemType } from "../types";
import ErrorComp from "../components/ui/ErrorComp";
import { useState, useEffect, useRef } from "react";

const FeedPage = () => {
  const { sources, categories, authors } = useSelector(
    (state: RootState) => state.user
  );

  // Track the current page and accumulate results
  const [page, setPage] = useState(1);
  const [allTopics, setAllTopics] = useState<TopicItemType[]>([]);

  const authorsAPIRes = useGetTopicsAggregate({
    topics: authors,
    sortBy: "popularity",
    pageSize: 5,
    page,
  });

  const categoriesAPIRes = useGetTopicsAggregate({
    topics: categories,
    sortBy: "popularity",
    pageSize: 5,
    page,
  });

  const sourcesAPIRes = useGetTopicsAggregate({
    topics: sources,
    sortBy: "popularity",
    pageSize: 5,
    page,
  });

  const allErrors =
    authorsAPIRes.allErrors &&
    categoriesAPIRes.allErrors &&
    sourcesAPIRes.allErrors;
  const isLoading =
    authorsAPIRes.isLoading ||
    categoriesAPIRes.isLoading ||
    sourcesAPIRes.isLoading;
  const error =
    authorsAPIRes.error || categoriesAPIRes.error || sourcesAPIRes.error;

  // When new data arrives for the current page, append it to allTopics
  useEffect(() => {
    let newData: TopicItemType[] = [];
    if (authorsAPIRes.data) {
      newData = newData.concat(authorsAPIRes.data);
    }
    if (categoriesAPIRes.data) {
      newData = newData.concat(categoriesAPIRes.data);
    }
    if (sourcesAPIRes.data) {
      newData = newData.concat(sourcesAPIRes.data);
    }
    if (newData.length > 0) {
      setAllTopics((prevTopics) => [...prevTopics, ...newData]);
    }
  }, [authorsAPIRes.data, categoriesAPIRes.data, sourcesAPIRes.data]);

  // Set up the intersection observer on a sentinel div
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <div className="page">
      <Header />

      <h1>Your feed</h1>
      <p>Recommended based on your preferences.</p>

      {allErrors && <ErrorComp message={`Error ${error}`} />}
      {!allTopics && <ErrorComp message={"No results found"} type="normal" />}

      {!allErrors && allTopics.length > 0 && (
        <ul className="page-list">
          {allTopics.map((article) => (
            <TopicItem key={article.id} topic={article} />
          ))}
        </ul>
      )}

      {isLoading && <Loading />}

      {/* Sentinel element to trigger infinite scroll */}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default FeedPage;
