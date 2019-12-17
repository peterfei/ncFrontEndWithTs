import Request from '@/utils/request'

export const getInfo = () =>
  Request.get(`http://dev.nc.com/api/excellent_courses/courses/good_courses`)
