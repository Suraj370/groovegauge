import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/joinRoom')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/joinRoom"!</div>
}
