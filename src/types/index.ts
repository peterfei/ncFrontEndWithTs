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
