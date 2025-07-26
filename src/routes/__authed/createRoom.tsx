import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__authed/createRoom')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/createRoom"!</div>
}
