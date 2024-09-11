import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/users/user-api';
import { getRoles } from '../../../api/users/role-api';
import { getBranch } from '../../../api/users/branch-api';


export const useGetUsers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsers,
    
  });

  return { data, isLoading, error, refetch };
};

export const useRoles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    
  });

  return { data, isLoading, error };
}

export const useBranch = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['branch'],
    queryFn: getBranch,
    
  });

  return { data, isLoading, error };
}
