// Header.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import textStyles from '../styles/Home.module.css';
import { GetServerSideProps } from 'next';
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  if(params?.id) {
    const authorName = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
      select : {
        name : true,
      },
    });

    console.log('author name is', authorName);

    return { props: {
      overRideName: authorName,
    }}
  }
}

type Props = {
  overRideName ?: any;
}
const Header: React.FC<Props> = (props) => {

  console.log('recieved props are', props);

  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const [session, loading] = useSession()

  let left = (
    <div className="left">
      <a href="/">
        <h1 className={textStyles.header}>Donation <span className={textStyles.orange}>Tracker</span></h1>
      </a>
      <style jsx>{`
          a {
            text-decoration: none;
            display: inline-block;
            color: #FFFFFF;
            transition: 0.2s ease-in-out;
          }
          a:hover {
            text-decoration: underline;
          }
          `}
      </style>
    </div>
  )

  let right = null

  if (loading) {
    left = (
      <div className="left">
      <a href="/"><h1 className={textStyles.header}>Donation <span className={textStyles.orange}>Tracker</span></h1></a>
      <style jsx>{`
          a {
            text-decoration: none;
            display: inline-block;
            color: #FFFFFF;
            transition: 0.2s ease-in-out;
          }
          a:hover {
            text-decoration: underline;
          }
          `}
      </style>
    </div>
    )
    right = (
      <div className={`right ${textStyles.orange} ${textStyles.bodyText}`}>
        <p>Validating session ...</p>
        
      </div>
    )
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')} className={textStyles.bodyText}>Log in</a>
        </Link>
        
        <style jsx>{`
          a {
            text-decoration: none;
            display: inline-block;
            color: #FFFFFF;
            transition: 0.2s ease-in-out;
          }
          a:hover {
            color: #FFA05A;
          }
          

          .right a {
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
          
        `}</style>
      </div>
    )
  }

  if (session) {
    left = (
      <div className="left">
      <a href="/">
        <h1 className={textStyles.header}>Karim's <span className={textStyles.orange}>Donations</span></h1>
      </a>
      <style jsx>{`
          a {
            text-decoration: none;
            display: inline-block;
            color: #FFFFFF;
            transition: 0.2s ease-in-out;
          }
          a:hover {
            text-decoration: underline;
          }
          `}
      </style>
    </div>
    )
    right = (
      <div className="right">
        <Link href="/create">
          <button>
            <a className={textStyles.bodyText}>Add Donation</a>
          </button>
        </Link>
        
        <button onClick={() => signOut()}>
          <a className={textStyles.bodyText}>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            display: inline-block;
            color: #FFFFFF;
            transition: 0.2s ease-in-out;
          }
          a:hover {
            color: #FFA05A;
          }

          a + a {
            margin-left: 1rem;
          }
          .right {
            background-color: rgba(17,31,154,1);
          }
          .right a {
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
          button {
            background-color: rgba(17,31,154,1);
            border: none;
          }
        `}</style>
      </div>
    )
  }


  return (
    <nav>
      
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </nav>
  )
}

export default Header