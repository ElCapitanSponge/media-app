import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/shows/$id')({
  component: () => <div>Hello /shows/$id!</div>
})