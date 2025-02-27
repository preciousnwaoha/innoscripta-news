export const topicsQuery = (topics: string[]) => {
  const query = topics.reduce((acc, topic, index) => {
    const topicWithoutSpaces = topic.replace(/\s/g, "%20");
    return `${acc}${index === 0 ? "" : " OR "}${topicWithoutSpaces}`;
  }, "");

  return query;
};

export const mapNewsSortBy = (from: string, sortBy?: string)  => {
    if (!sortBy) return undefined

  const guardianSortBy = ["newest", "oldest", "relevance"];
  const newsapiSortBy = ["publishedAt", "relevancy", "popularity"];

  switch (from) {
    case "guardian":
      return guardianSortBy.includes(sortBy) ? sortBy : "relevance";
    case "newsapi":
      return newsapiSortBy.includes(sortBy) ? sortBy : "popularity";
    case "nytimes":
      return guardianSortBy.includes(sortBy) ? sortBy : "relevance";
    default:
      return "popularity";
  }
};


export function formatDateToYYYYMMDD(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    // getMonth returns 0-based month so we add 1 and pad it with a leading zero if needed
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }