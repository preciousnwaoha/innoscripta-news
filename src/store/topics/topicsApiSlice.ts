// src/features/topics/topicsApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TopicsQueryParams,
  NewsAPIResponse,
  TheGuardianResponse,
  TopicItemType,
  NYTResponse,
} from "../../types/index";
import { envs } from "../../config/envs";
import {mapNewsSortBy, topicsQuery } from "../../utils";

export const topicsApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    // NewsAPI.org general endpoint
    getNewsAPIArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({ topics, from, sortBy, language, pageSize, page, keywords }) => ({
        url: "https://newsapi.org/v2/everything",
        params: {
          q: topicsQuery(topics.concat(keywords ? keywords : [])),
          from: from,
          sortBy: mapNewsSortBy("newsapi", sortBy),
          apiKey: envs.API_KEY_NEWS_API_ORG,
          searchIn: "title,description",
          language: language || "en",
          pageSize: pageSize || 10,
          page: page || 1,
        },
      }),
      transformResponse: (response: NewsAPIResponse) => {

        const topics = response.articles.map((article) => ({
          id: article.url,
          title: article.title,
          description: article.description,
          image: article.urlToImage || "",
          datetime: article.publishedAt,
          content: null,
          url: article.url,
          source: {
            name: article.source.name || "",
            url: article.url,
            image: "",
          },
          author: {
            name: article.author || "",
            url: "",
            image: "",
          },
          categories: [],
          subcategories: [],
          keywords: [],
          likes: 0,
          views: 0,
          apiSource: "newsapi",
        }));

        return topics;
      },
      transformErrorResponse: (
        response: { status: string | number }
      ) => response.status,
    }),

    // The Guardian endpoint
    getTheGuardianArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({
        topics,
        from,
        sortBy,
        pageSize,
        page,
        language,
        ids,
        fromUser,
      }) => ({
        url: "https://content.guardianapis.com/search",
        params: {
          q: fromUser ? "" : topicsQuery(topics),
          "to-date": new Date().toISOString().split("T")[0],
          "from-date": from || new Date().toISOString().split("T")[0],
          "order-by": mapNewsSortBy("guardian", sortBy),
          "api-key": envs.API_KEY_THE_GUARDIAN,
          "show-fields": "thumbnail,headline,trailText,byline,publication,body",
          "show-tags": "contributor,keyword,publication,type",
          "page-size": pageSize || 10,
          page: page || 1,
          lang: language || "en",
          ids: ids ? ids?.join(",") : undefined,
        },
      }),
      transformResponse: (response: TheGuardianResponse) => {
        const topics: TopicItemType[] = response.response.results.map(
          (article) => {
            const contributor = article.tags.find(
              (tag) => tag.type === "contributor"
            );

            const keywords = article.tags
              .filter((tag) => tag.type === "keyword")
              .map((tag) => tag.webTitle);
            return {
              id: article.id,
              title: article.webTitle,
              description: article.fields.trailText,
              image: article.fields.thumbnail || "",
              datetime: article.webPublicationDate,
              content: article.fields.body || null,
              url: article.webUrl,
              source: {
                name: "The Guardian",
                url: article.webUrl,
                image: "",
              },
              author: {
                name: contributor?.webTitle || article.fields.byline || "",
                url: contributor?.webUrl || "",
                image: "",
              },
              categories: [article.pillarName],
              subcategories: [article.sectionName],
              keywords,
              likes: 0,
              views: 0,
              apiSource: "theguardian",
            };
          }
        );

        return topics;
      },
      transformErrorResponse: (
        response: { status: string | number }
      ) => response.status,
    }),

    // New York Times endpoint
    getNewYorkTimesArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({ topics, from, to, sortBy, page, keywords }) => {
        return {
          url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
          params: {
            q: topicsQuery(topics.concat(keywords ? keywords : [])),
            end_date: to,
            begin_date: from,
            sort: mapNewsSortBy("nytimes", sortBy),
            "api-key": envs.API_KEY_NEW_YORK_TIMES,
            // fl: "web_url,headline,thumbnail",
            page: page || 1,
            facet_fields: "source,section_name,subsection_name,ingredients",
          },
        };
      },
      transformResponse: (response: NYTResponse) => {
        const { docs } = response.response;
        const topics: TopicItemType[] = docs.map((article) => {
          const thumbnailImage = article.multimedia.filter(
            (media) => media.subtype === "jumbo"
          )[0];
          const firstImage =
            article.multimedia.length > 0 ? article.multimedia[0].url : "";

          const imageWithOrigin = thumbnailImage
            ? "https://www.nytimes.com/" + thumbnailImage.url
            : firstImage;

          return {
            id: article._id,
            title:
              article.headline.main || article.headline.print_headline || "",
            description: article.abstract,
            image: imageWithOrigin,
            datetime: article.pub_date,
            content: null,
            url: article.web_url,
            source: {
              name: article.source || "The New York Times",
              url: article.web_url,
              image: "",
            },
            author: {
              name: article.byline.original || "",
              url: "",
              image: "",
            },
            categories: [article.section_name],
            subcategories: [article.subsection_name],
            keywords: article.keywords.map((keyword) => keyword.value) || [],
            likes: 0,
            views: 0,
            apiSource: "nytimes",
          };
        });

        return topics;
      },

      transformErrorResponse: (
        response: { status: string | number }
      ) => response.status,
    }),
  }),
});

export const {
  useGetNewsAPIArticlesQuery,
  useGetTheGuardianArticlesQuery,
  useGetNewYorkTimesArticlesQuery,
} = topicsApi;
