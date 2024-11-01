export type TSection = 'slots' | 'live';

export enum ContentOrderEnum {
  Home,
  Category,
  Favorite,
  FavoriteSlots,
  RecentlyPlayed,
}

export interface IContentOrder {
  type: ContentOrderEnum
  value: string | null
}

export interface IRangeFilters {
  min: number
  max: number
}

export interface IConfigResponse {
  theme: string
  defaultLocale: string
  showPlayersCount: boolean
  showBetLimit: boolean
  homePageContentOrder: IContentOrder[]
  menuContentOrder: IContentOrder[]
  rangeFilters: IRangeFilters[]
}