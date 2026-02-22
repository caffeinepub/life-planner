import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Study } from '../backend';

export function useStudies() {
  const { actor, isFetching } = useActor();

  return useQuery<Study[]>({
    queryKey: ['studies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStudy() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (study: Study) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStudy(study);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
    },
  });
}
