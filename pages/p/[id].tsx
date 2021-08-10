import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layouts'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { PeriodAmount } from '../../components/DonationOverview'
import { Donation } from '../../components/SingleDonationCard'
import textStyles from '../../styles/Home.module.css'
import { DonationTracker, TrackerProps } from '../../components/DonationTracker'



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const donationList = await prisma.donation.findMany({
    where: { 
      author: {
        id: String(params?.id) || "",
      },
      published: true
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  let periodAmounts : PeriodAmount = {
    year: 0,
    month: 0,
    day: 0,
  }
  let donations : Donation[] = []
  let currentTime = new Date().getTime()
  donationList.forEach( (donation) => {
    //gets difference from current time to time created in ms
    let timeDiff : number = Math.abs(currentTime - donation.createdAt.getTime())

    //checks if created within last day
    if(timeDiff<= 86400000)
      periodAmounts.day += +donation?.amount
    if(timeDiff <= 86400000*30)
      periodAmounts.month += +donation?.amount
    if(timeDiff <= 86400000*365.25)
      periodAmounts.year += +donation?.amount

    let donationProp : Donation = {
      id: String(donation.id),
      institution: donation.institution,
      amount: +donation.amount,
      date: donation.createdAt.toDateString()
    }
    donations.push(donationProp);
  });
  return { props: {
    session: donations.length > 0 ? true : false,
    periodAmounts: periodAmounts,
    donations: donations,
  }}
}
/* async function deletePost(id: number): Promise<void> {
  let httpURL:string = ''

  if(window.location.hostname == 'localhost') 
    httpURL = `http://localhost:3000/api/post/${id}`
  else
    httpURL = `https://donation.karimalatrash.com/api/post/${id}` 
  
  await fetch(httpURL, {
    method: 'DELETE',
  })
  Router.push('/')
} */

const Person: React.FC<TrackerProps> = (props : TrackerProps) => {
  /* const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  } */
  /* const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  } */
  return (
    <Layout>
        <DonationTracker {...props} />
    </Layout>
  
  )
  
}

export default Person