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
import { formatDateToYYYYMMDD, mapNewsSortBy, topicsQuery } from "../../utils";

export const topicsApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    // NewsAPI.org general endpoint
    getNewsAPIArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({ topics, from, sortBy, language, pageSize, page }) => ({
        url: "https://newsapi.org/v2/everything",
        params: {
          q: topicsQuery(topics),
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
        console.log(response);

        const topics = response.articles.map((article) => ({
          id: article.url,
          title: article.title,
          description: article.description,
          image: article.urlToImage || "",
          datetime: article.publishedAt,
          url: article.url,
          source: {
            name: article.source.name,
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
        }));

        return topics;
      },
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
    }),

    // The Guardian endpoint
    getTheGuardianArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({ topics, from, sortBy, pageSize, page, language }) => ({
        url: "https://content.guardianapis.com/search",
        params: {
          q: topicsQuery(topics),
          "to-date": new Date().toISOString().split("T")[0],
          "from-date": from || new Date().toISOString().split("T")[0],
          "order-by": mapNewsSortBy("guardian", sortBy),
          "api-key": envs.API_KEY_THE_GUARDIAN,
          "show-fields": "thumbnail,headline,trailText,byline,publication",
          "show-tags": "contributor,keyword,publication,type",
          "page-size": pageSize || 10,
          page: page || 1,
          lang: language || "en",
        },
      }),
      transformResponse: (response: TheGuardianResponse) => {
        console.log(response);

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
            };
          }
        );

        return topics;
      },
    }),

    // New York Times endpoint
    getNewYorkTimesArticles: builder.query<TopicItemType[], TopicsQueryParams>({
      query: ({ topics, from, sortBy, page }) => ({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        params: {
          q: topicsQuery(topics),
          end_date: formatDateToYYYYMMDD(
            new Date().toISOString().split("T")[0]
          ),
          begin_date: formatDateToYYYYMMDD(
            from || new Date().toISOString().split("T")[0]
          ),
          sort: mapNewsSortBy("nytimes", sortBy),
          "api-key": envs.API_KEY_NEW_YORK_TIMES,
          // fl: "web_url,headline,thumbnail",
          page: page || 1,
          facet_fields: "source,section_name,subsection_name,ingredients",
          // fq: `source:("The New York Times")`,
        },
      }),
      transformResponse: (response: NYTResponse) => {
        console.log(response);
        const { docs } = response.response;
        const topics: TopicItemType[] = docs.map((article) => {
          const thumbnailImage = article.multimedia.filter(
            (media) => media.subtype === "jumbo"
          )[0]
          const firstImage = article.multimedia.length > 0 ? article.multimedia[0].url : "";

          const imageWithOrigin = thumbnailImage ? "https://www.nytimes.com/" + thumbnailImage.url : firstImage

          return {
            id: article._id,
            title:
              article.headline.main || article.headline.print_headline || "",
            description: article.abstract,
            image: imageWithOrigin,
            datetime: article.pub_date,
            url: article.web_url,
            source: {
              name: article.source || "The New York Times",
              url: article.web_url,
              image: "",
            },
            author: {
              name: article.byline.original,
              url: "",
              image: "",
            },
            categories: [article.section_name],
            subcategories: [article.subsection_name],
            keywords: article.keywords.map((keyword) => keyword.value) || [],
            likes: 0,
            views: 0,
          };
        });

        return topics;
      },
    }),

    //  // NewsAPI AI endpoint
    // getNewsAPIAIArticles: builder.query<TopicItemType[], TopicsQueryParams>({
    //   query: ({ topics, from, sortBy, language, pageSize, page }) => ({
    //     url: "https://eventregistry.org/api/v1/article/getArticles",
    //     body: {
    //       action: "getArticles",
    //       resultType: "articles",
    //       articlesSortBy: "date",
    //       articlesSortByAsc: false,
    //       keywords: topicsQuery(topics),
    //       lang: language || "eng",
    //       dateStart: from,
    //       dateEnd: new Date().toISOString().split("T")[0],
    //       articlesPage: page || 1,
    //       articlesCount: pageSize || 10,
    //       apiKey: envs.API_KEY_NEWS_API_AI,
    //     }
  }),
});

export const {
  useGetNewsAPIArticlesQuery,
  useGetTheGuardianArticlesQuery,
  useGetNewYorkTimesArticlesQuery,
} = topicsApi;
