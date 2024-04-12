import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/movies/$id')({
  component: () => <div>Hello /movies/$id!</div>
})