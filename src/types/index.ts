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
export interface IBoxCardStyle {
  display: string
  padding: string
  width: string
}

export interface ICateList {
  id: string
  activeId: number
  title: string
  children: ICategories[] | ICateOption[]
}
export interface ICateFixedList {
  id: string
  activeId: number
  title: string
  types: string
  children: ICategories[] | ICateOption[]
}
export interface ICateOption {
  name: string
  value?: string
  id: string
  types?: string
}

export interface ICategories {
  children: ICategories[] | ICateOption[]
  depth: number
  id: number | any
  is_leaf: number
  name: string
  ordering: number
  parent_id: number
  parent_id_list: string | string[]
  status: number
  value?: string | any
  types?: string | any
  activeId?: any
}

export interface IUploadPolicy {
  accessid: string
  host: string
  policy: string
  signature: string
  expire: number
  dir: string
  filename: string
}
