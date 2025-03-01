export const topicsQuery = (topics: string[]) => {
  const query = topics.reduce((acc, topic, index) => {
    const topicWithoutSpaces = topic.replace(/\s/g, "%20");
    return `${acc}${index === 0 ? "" : " OR "}${topicWithoutSpaces}`;
  }, "");

  return query;
};

export const mapNewsSortBy = (from: string, sortBy?: string) => {
  if (!sortBy) return undefined;

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
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function getLastPartOfUrlAsNormalString(url: string): string {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1].replace(/-/g, " ");
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
