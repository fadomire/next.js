'use client'
import * as React from 'react'
import { type ComponentProps, useActionState, useState } from 'react'
import Form from 'next/form'
import { useRouter } from 'next/router'

export default function Page() {
  const destination = '/pages-dir/redirected-from-action'
  const [query, setQuery] = useState('')
  return (
    <Form action="/pages-dir/search" id="search-form">
      <input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <NavigateButton to={destination + '?' + new URLSearchParams({ query })}>
        Submit (client action)
      </NavigateButton>
    </Form>
  )
}

function NavigateButton({
  to,
  ...props
}: { to: string } & ComponentProps<'button'>) {
  const router = useRouter()
  const [, dispatch] = useActionState(() => {
    // TODO(form): this doesn't work unless wrapped in a startTransition...
    // why is this necessary here?
    // without it, the URL updates, but we stay on the old page...
    React.startTransition(() => {
      router.push(to)
    })
  }, undefined)
  return <button type="submit" formAction={dispatch} {...props} />
}
