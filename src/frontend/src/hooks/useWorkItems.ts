import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { WorkItem } from '../backend';

export function useWorkItems() {
  const { actor, isFetching } = useActor();

  return useQuery<WorkItem[]>({
    queryKey: ['workItems'],
    queryFn: async () => {
      if (!actor) return [];
      const items = await actor.getWorkItems();
      return items.sort((a, b) => Number(a.deadline - b.deadline));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWorkItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workItem: WorkItem) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWorkItem(workItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workItems'] });
    },
  });
}
