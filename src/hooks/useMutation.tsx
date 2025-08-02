import * as React from 'react'

export function useMutation<TVariables, TData, TError = Error>(opts: {
  fn: (variables: TVariables) => Promise<TData>
  onSuccess?: (ctx: { data: TData }) => void | Promise<void>
  onError?: (error: TError) => void | Promise<void> // Added onError support
}) {
  const [submittedAt, setSubmittedAt] = React.useState<number | undefined>()
  const [variables, setVariables] = React.useState<TVariables | undefined>()
  const [error, setError] = React.useState<TError | undefined>()
  const [data, setData] = React.useState<TData | undefined>()
  const [status, setStatus] = React.useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')

  const mutate = React.useCallback(
    async (variables: TVariables): Promise<TData | undefined> => {
      setStatus('pending')
      setSubmittedAt(Date.now())
      setVariables(variables)
      //
      try {
        const data = await opts.fn(variables)
        await opts.onSuccess?.({ data })
        setStatus('success')
        setError(undefined)
        setData(data)
        return data
      } catch (err) {
        const error = err as TError
        setStatus('error')
        setError(error)
        await opts.onError?.(error) // Call onError if provided
      }
    },
    [opts.fn, opts.onSuccess, opts.onError], // Added onError to dependencies
  )

  // Computed properties for convenience
  const isPending = status === 'pending'
  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isIdle = status === 'idle'

  return {
    status,
    variables,
    submittedAt,
    mutate,
    error,
    data,
    isPending,
    isSuccess, 
    isError,
    isIdle,
  }
}