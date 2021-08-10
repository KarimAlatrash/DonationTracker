import React from "react"
import { GetServerSideProps } from "next"
import Head from 'next/head'
import Layout from "../components/Layouts"
import { getSession } from 'next-auth/client'
import prisma from "../lib/prisma";
import DonationOverview, { PeriodAmount} from "../components/DonationOverview";
import SingleDonationCard, {Donation} from "../components/SingleDonationCard";
import ReactMarkdown from "react-markdown";
import textStyles from '../styles/Home.module.css';
import layoutStyles from '../styles/DonationOverviewStyles.module.css';
import { DonationTracker, TrackerProps } from "../components/DonationTracker";
import InstitutionList from "../components/InstitutionList"
import { InstitutionType } from "../components/InstitutionCard"

interface IndexProps {
  institutionList: InstitutionType[],
  session: any,
  periodAmounts: PeriodAmount,
  donations: Donation[], 
}

export const numberFormat : any  = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const getServerSideProps: GetServerSideProps = async ( {req, res} ) => {
  const session = await getSession({ req })
  if (!session) {
    const institutionData = await prisma.donation.findMany({
      where: {
        published: true
      },
      select: {
        institution: true,
        amount: true,
      }
    });
    let collatedInstitutionData = institutionData.reduce((r, {institution,amount}, index) => {
      r[index] = r[index] || {institution, amount,}
      r[index].amount += amount;
      return r
    }, {});

    return { props: {
      institutionList: Object.values(collatedInstitutionData),
      session: session,
      periodAmounts: null,
      donations: null, 
    }}
  }

  const donationList = await prisma.donation.findMany({
    where: { 
      author: { email: session.user.email },
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
    session: session,
    periodAmounts: periodAmounts,
    donations: donations,
  }}
}

const DonationPage: React.FC<IndexProps> = (props : IndexProps) => {
  return (
    <Layout>
      <Head>
        <title>Donation Tracker</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {
        props.session ? 
          <DonationTracker {...props} />
        :
        <div>
          <a className={`${textStyles.xlBodyText} ${textStyles.hyperlink}`} href="/api/auth/signin">Log in to start tracking donations</a>
          <InstitutionList {...props}/>
        </div>
      }
      
    </Layout>
  )
}

export default DonationPage
