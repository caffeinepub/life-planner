import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Habit } from '../backend';

export function useHabits() {
  const { actor, isFetching } = useActor();

  return useQuery<Habit[]>({
    queryKey: ['habits'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddHabit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habit: Habit) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addHabit(habit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}
