// src/hooks/useGetTopicsAggregate.tsx
import { useMemo } from "react";
import {
  useGetNewsAPIArticlesQuery,
  useGetTheGuardianArticlesQuery,
  useGetNewYorkTimesArticlesQuery,
} from "../store/topics/topicsApiSlice";
import type { TopicsQueryParams, TopicItemType } from "../types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type{ SerializedError } from "@reduxjs/toolkit";

interface UseTopicsAggregateResult {
  data: TopicItemType[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  allErrors: boolean;
}

const useGetTopicsAggregate = (
  params: TopicsQueryParams
): UseTopicsAggregateResult => {
  const newsAPI = useGetNewsAPIArticlesQuery(params);
  const guardianAPI = useGetTheGuardianArticlesQuery(params);
  const nytAPI = useGetNewYorkTimesArticlesQuery(params);

  // Overall loading: true if any endpoint is still loading.
  const isLoading =
    newsAPI.isLoading || guardianAPI.isLoading || nytAPI.isLoading;
  // Combine errors: you might choose to collect them into an array or just pick the first one.
  const error = newsAPI.error || guardianAPI.error || nytAPI.error;

  const allErrors = !!newsAPI.error && !!guardianAPI.error && !!nytAPI.error;

  // Combine data from each endpoint into one array
  const data = useMemo(() => {
    let combined: TopicItemType[] = [];
    if (newsAPI.data) {
      combined = combined.concat(newsAPI.data);
    }
    if (guardianAPI.data) {
      combined = combined.concat(guardianAPI.data);
    }
    if (nytAPI.data) {
      combined = combined.concat(nytAPI.data);
    }
    return combined;
  }, [newsAPI.data, guardianAPI.data, nytAPI.data]);

  return {
    data,
    isLoading,
    error,
    allErrors,
  };
};

export default useGetTopicsAggregate;
