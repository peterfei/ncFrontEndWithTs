export interface ICourseDetailsState {
    //[recommendCourseList: Array<object>]: any
    //[chapterList: Array<object>]: any
    //[expireTime: string]: any
    recommendCourseList: string[]
    chapterList: string[]
    expireTime: string | any
}
export interface IRecommendCourse {
    id: number
    name: string
    cover: string
    is_free: number
    base_price: number
    category_id: number
    is_recommend: number
    learners_count: number
    comments_count: number
    total_score: number
    updated_at: string | any
    created_at: string | any
    category: Array<object> | any
    mark: string
    stars: number | any
}
