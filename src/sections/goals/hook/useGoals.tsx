import { useQuery } from "@tanstack/react-query";
import { getMonthlyTargets, getTargetsProjects } from "../../../api/goals/goal-api";

export const useGetTargetsObjetives = () => {
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["projects"],
      queryFn: getTargetsProjects,
      retry: 10, // Retry the request up to 5 times
      retryDelay: (attempt) => attempt * 1000, // Delay between retries, increasing with each attempt
    });
  
    return { data, isLoading, error, refetch };
  };

  export const useGetMonthlyTargets = () => {
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["monthly"],
      queryFn: getMonthlyTargets,
      retry: 10, // Retry the request up to 5 times
      retryDelay: (attempt) => attempt * 1000, // Delay between retries, increasing with each attempt
    });
  
    return { data, isLoading, error, refetch };
  }
  