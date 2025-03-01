import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import TopicItem from "../components/topic/TopicItem";
import ErrorComp from "../components/ui/ErrorComp";
import Loading from "../components/ui/Loading";
import useGetTopicsAggregate from "../hooks/useGetTopicsAggregate";
import { TopicItemType } from "../types";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [allTopics, setAllTopics] = useState<TopicItemType[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, error, allErrors, isLoading } = useGetTopicsAggregate({
    topics: [""],
    from: "2025-02-24",
    sortBy: "newest",
    page,
    pageSize: 6,
  });

  // Append newly fetched data to the accumulated topics list
  useEffect(() => {
    if (data && data.length > 0) {
      setAllTopics((prevTopics) => [...prevTopics, ...data]);
    }
  }, [data]);

  // Set up the Intersection Observer on the sentinel element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
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
    <>
      <Header />

      <h1>Today's briefing</h1>
      <p>Catchup on what's trending</p>

      {allErrors && <ErrorComp message={`Error ${error}`} />}
      {!allTopics.length && !isLoading && (
        <ErrorComp message={"No results found"} type="normal" />
      )}

      {allTopics.length > 0 && (
        <ul className="page-list">
          {allTopics.map((article) => (
            <TopicItem key={article.id} topic={article} />
          ))}
        </ul>
      )}
      {isLoading && <Loading />}

      {/* Sentinel element to trigger loading more results */}
      <div ref={observerRef} style={{ height: "1px" }} />
    </>
  );
};

export default HomePage;
