import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CoursesIndexRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/resources')
  }, [router])

  return null
}

