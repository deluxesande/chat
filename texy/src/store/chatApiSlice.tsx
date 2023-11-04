import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Chat {
    id: number;
}

export const chatsApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    tagTypes: ["chats"],
    endpoints: (builder) => ({
        getAllChats: builder.query<[], void>({
            query: () => "users/",
            // To automate refetch
            providesTags: ["chats"],
        }),

        getChat: builder.query<object, number>({
            query: (id) => `users/${id}`,
            providesTags: ["chats"],
        }),

        addChat: builder.mutation<void, object>({
            query: (chat) => ({
                url: "users/",
                method: "POST",
                body: chat,
            }),
            invalidatesTags: ["chats"],
        }),

        updateChat: builder.mutation<void, object | Chat>({
            query: (chat) => ({
                url: `users/${chat?.id}`,
                method: "PATCH",
                body: chat,
            }),
        }),

        deleteChat: builder.mutation<void, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllChatsQuery,
    useGetChatQuery,
    useAddChatMutation,
    useUpdateChatMutation,
    useDeleteChatMutation,
} = chatsApi;
