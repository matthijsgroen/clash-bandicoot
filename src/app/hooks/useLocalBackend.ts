import {
  QueryFunction,
  QueryKey,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { useServiceWorker } from "./useServiceWorker";

export const useLocalBackend = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>
): UseQueryResult<TData, TError> => {
  const hasServiceWorker = useServiceWorker();
  return useQuery({
    queryKey,
    queryFn,
    networkMode: "always",
    enabled: hasServiceWorker,
  });
};
