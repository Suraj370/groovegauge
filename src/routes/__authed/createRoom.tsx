import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/__authed/createRoom')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='min-h-screen text-white flex justify-center items-center'>Hello "/createRoom"!</div>
}
