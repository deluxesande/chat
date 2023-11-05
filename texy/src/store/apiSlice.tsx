import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { userActions } from "./userSlice";
import { RootState } from "./app";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    // eslint-disable-next-line @typescript-eslint/ban-types
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result?.error?.status === 403) {
        const refreshResult = await baseQuery(
            "/auth/refresh-tokens",
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const user = api.getState().auth.user;

            // Store new token
            api.dispatch(
                userActions.setCredentials({ ...refreshResult.data, user })
            );

            // Retry original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(userActions.logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
});
