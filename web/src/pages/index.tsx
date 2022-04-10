import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser()

  useEffect(() => user && console.log(user), [user])

  return null
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req, res);
  const token = getAccessToken(req, res)
  console.log(token);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      }
    }
  } 

  return {
    redirect: {
      destination: '/app',
      permanent: false,
    }
  }

}
