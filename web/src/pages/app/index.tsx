import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";


export default function Home() {
  const { user } = useUser();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
      <h1>Bem Vindo{user && `, ${user.name}`}!</h1>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps= withPageAuthRequired()
