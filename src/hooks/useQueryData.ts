import {  QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseQueryDataOptions<T> = {
    enabled?: boolean;
    disableRefetch?: boolean;
    staleTime?: number;
    cacheTime?: number;
    select?: UseQueryOptions<T>['select'];
  };
  
  export const useQueryData = <T>(
    queryKey: QueryKey,
    queryFn: QueryFunction<T>,
    options?: UseQueryDataOptions<T>
  ) => {
    const {
      enabled = true,
      disableRefetch = false,
      staleTime = Infinity,
      cacheTime = 1000 * 60 * 30,
      select,
    } = options ?? {};
  
    const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
      queryKey,
      queryFn,
      enabled,
      staleTime,
      cacheTime,
      select,
      refetchOnWindowFocus: !disableRefetch,
      refetchOnMount: !disableRefetch,
      refetchOnReconnect: !disableRefetch,
    } as UseQueryOptions<T>); // Type assertion to allow full config
    // Alternatively, you can use generic overload below to avoid cast
  
    return {
      data,
      isPending,
      isFetched,
      refetch,
      isFetching,
    };
  };
  


// export const useQueryData = (queryKey:QueryKey, queryFn:QueryFunction, enabled?:Enabled) => {
//     const {data, isPending, isFetched, refetch, isFetching} = useQuery({
//         queryKey,
//         queryFn,
//         enabled
//     })
//     return{
//         data,
//         isPending,
//         isFetched,
//         refetch,
//         isFetching,
//     }
// }
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
