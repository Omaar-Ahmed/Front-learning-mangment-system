import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";

const customBase = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOption: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    const result: any = await baseQuery(args, api, extraOption);

    if (result.data) {
      result.data = result.data.data
    }

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";
    return { error: { status: "FETCH_ERROR", error: errorMessage } }
  }
}

export const api = createApi({
  baseQuery: customBase,
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses/listcourses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }]
    })
  })
})


export const {

  useGetCoursesQuery,
  useGetCourseQuery,

} = api;
