export interface TopicType {
  id: number;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
}

export interface TopicItemType {
  id: string;
  title: string;
  description: string;
  image: string;
  datetime: string;
  url: string;
  source: {
    name: string;
    url: string;
    image: string;
  };
  author: {
    name: string;
    url: string;
    image: string;
  };
  categories: string[];
  subcategories: string[];
  keywords: string[];
  likes: number;
  views: number;
}


export interface TopicsQueryParams {
    topics: string[];
    to?: string;
    from?: string;
    sortBy?: string;
    language?: string;
    pageSize?: number;
    page?: number;
  }

  
export interface NewsAPIResponseArticle {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  string: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIResponseArticle[];
}

export interface NewsAPITopHeadlinesParams {
  topic: string;
  country: string;
  category: string;
  pageSize?: number;
  page?: number;
}

export interface TheGuardianResponseArticle {
  id: string;
  type: string;
  fields: {
    thumbnail: string;
    trailText: string;
    headline: string;
    byline: string;
  };
  tags: {
    id: string;
    type: "contributor" | "keyword" | "publication" | "type";
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    references: string[];
  }[]
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface TheGuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TheGuardianResponseArticle[];
  };
}

export interface BBCResponseArticle {
  id: string;
  type: string;
  section: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
}

export interface BBCResponse {
  status: string;
  totalResults: number;
  articles: BBCResponseArticle[];
}

export interface NYTResponseArticle {
  abstract: string;
  byline: {
    original: string;
    organization: string;
    person: {
      firstname: string;
      lastname: string | null;
      middlename: string | null;
      organization: string;
      qualifier: string | null;
      rank: number;
      role: string | null;
      title: string | null;
    }[];
  };
  document_type: string;
  headline: {
    main: string | null;
    kicker: string | null;
    content_kicker: string | null;
    name: string | null;
    print_headline: string | null;
    seo: string | null;
    sub: string | null;
  };
  keywords: {
    name: string;
    value: string;
    rank: number;
    major: string;
  }[];
  lead_paragraph: string;
  multimedia: {
    rank: number;
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    credit: string;
    crop_name: string;
  }[];
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

export interface NYTResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTResponseArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}
