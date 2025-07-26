import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '../hooks/useMutation'
import { loginFn } from '../routes/__authed'
import { signupFn } from '../routes/signup'
import { Auth } from './Auth'

export function Login() {
  const router = useRouter()

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate()
        router.navigate({ to: '/' })
      }
    },
  })

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

  const isSubmitting = loginMutation.status === 'pending'

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Welcome back</h2>

      <Auth
        actionText={isSubmitting ? 'Logging in...' : 'Login'}
        status={loginMutation.status}
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)

          loginMutation.mutate({
            data: {
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            },
          })
        }}
        afterSubmit={
          loginMutation.data ? (
            <div className="mt-4">
              {loginMutation.data.error ? (
                <div className="text-sm text-red-500 mb-2">
                  {loginMutation.data.message}
                </div>
              ) : (
                <div className="text-sm text-green-500">
                  Logged in successfully.
                </div>
              )}

              {loginMutation.data.message === 'Invalid login credentials' && (
                <button
                  className="mt-2 text-sm text-blue-600 underline hover:text-blue-800 transition"
                  onClick={(e) => {
                    const formData = new FormData(
                      (e.target as HTMLButtonElement).form!,
                    )

                    signupMutation.mutate({
                      data: {
                        email: formData.get('email') as string,
                        password: formData.get('password') as string,
                      },
                    })
                  }}
                  type="button"
                >
                  No account? Sign up instead.
                </button>
              )}
            </div>
          ) : null
        }
      />
    </div>
  )
}
