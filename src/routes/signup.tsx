import { redirect, createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useMutation } from '../hooks/useMutation'
import { getSupabaseServerClient } from '../integrations/supabase/supabase'
import { Signup } from '@/components/Signup'
import { toast } from 'sonner'

export const signupFn = createServerFn({ method: 'POST' })
  .validator(
    (d: { email: string; password: string; redirectUrl?: string }) => d,
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }

    toast("Success", {
      description: "You have successfully signed up",
    })

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      href: data.redirectUrl || '/login',
    })
  })

export const Route = createFileRoute('/signup')({
  component: SignupComp,
})

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

  return (
    
    <>
    <Signup />
    </>
  )
}