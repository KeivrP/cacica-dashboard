import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'src/api/users/user-api';

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsers,
    retry: 5
  });

  return { data, isLoading, error };
};
