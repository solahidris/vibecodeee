import type { GetServerSideProps } from 'next'

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/resources',
    permanent: false,
  },
})

export default function CoursesIndexRedirect() {
  return null
}

