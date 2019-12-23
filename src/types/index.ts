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
export interface IBannerUrl {
  id: number
  url: string
}
export interface IBoxCardStyle {
  display: string
  padding: string
  width: string
}
