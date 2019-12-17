import Request from "@/utils/request";

export const Course = {
  getGoodCourse() {
    return Request.xget(
      "http://dev.nc.com/api/excellent_courses/courses/good_courses"
    );
  }
};
