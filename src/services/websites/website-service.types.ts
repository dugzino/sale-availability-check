interface ISearchSchemaItem {
  articleName: string;
  search: string;
}

interface ISearchParamsItem {
  articleName: string;
  path: string;
}

export type searchSchemaType = Array<ISearchSchemaItem>;
export type searchParamsType = Array<ISearchParamsItem>;
