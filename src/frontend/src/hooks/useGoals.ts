import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Goal } from '../backend';

export function useGoals() {
  const { actor, isFetching } = useActor();

  return useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGoal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: Goal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGoal(goal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}
