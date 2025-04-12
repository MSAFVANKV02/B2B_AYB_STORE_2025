import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";


export const useQueryData = (queryKey:QueryKey, queryFn:QueryFunction, enabled?:Enabled) => {
    const {data, isPending, isFetched, refetch, isFetching} = useQuery({
        queryKey,
        queryFn,
        enabled
    })
    return{
        data,
        isPending,
        isFetched,
        refetch,
        isFetching,
    }
}
// import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

// // Update the return type to reflect only used properties
// export const useQueryData = <T>(queryKey: QueryKey, queryFn: QueryFunction<T>, enabled?: boolean) => {
//   // Destructure only the required values
//   const { data, isFetching, refetch, isLoading } = useQuery<T>({
//     queryKey,
//     queryFn,
//     enabled,
//   });

//   return {
//     data,
//     isFetching,
//     refetch,
//     isLoading, // Use isLoading instead of isPending
//   };
// };
