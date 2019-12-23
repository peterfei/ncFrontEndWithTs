export interface INavList {
  index: string
  name: string
  link: string
  children: string[] | any
}
export interface IListItemFooter {
  index: number
  name: string
  link: string
}
export interface INavItemData {
  id: number
  name: string
  children: Array<any> | any
}
export interface INavSideBar {
  id: number
  name: string
}
export interface ISchInner {
  id: number
  schLogo: string
}
// 热门tag搜索
export interface ISearchHotTags {
  index: number
  name: string
}
export interface IBannerUrl {
  id: number
  url: string
}
