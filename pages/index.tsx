import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layouts"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma";
import DonationOverview, { PeriodAmount} from "../components/DonationOverview";
import SingleDonationCard, {Donation} from "../components/SingleDonationCard";

import textStyles from '../styles/Home.module.css';
import layoutStyles from '../styles/DonationOverviewStyles.module.css';

export const getStaticProps: GetStaticProps = async () => {
  /* const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  }) */
  //CUSTOM PROPS FOR TESTING
  const periodAmounts:PeriodAmount = {
    year: 5,
    month: 6,
    day: 4
  };
  const donations : Donation[] = [
    {
      id: '1',
      institution: "Sistering Women's Shelter",
      amount: 300,
      date: "June 22 2001",
    },
    {
      id: '2',
      institution: "Zaqa'a",
      amount: 100,
      date: "June 22 2021",
    }
  ];

  console.log(donations[1]);
  return { 
    props: {
      periodAmounts: periodAmounts,
      donations: donations,
    }
    
   }
}

type Props = {
  periodAmounts: PeriodAmount,
  donations: Donation[]
}

const DonationTracker: React.FC<Props> = (props : Props) => {
  console.log(props);
  return (
    <Layout>
      
      <div className="page">
        <h1 className={textStyles.header}>Karim's <span className={textStyles.orange}>Donations</span></h1>
        <main className={layoutStyles.mainContainer}>

          <DonationOverview amount={props.periodAmounts}/>
          <div className={layoutStyles.donationListContainer}>
            <h1 className={textStyles.header}>Where Money Has Gone</h1>
            
            {props.donations.map((donation) => (
              <div key={donation.id} className="post">
                <SingleDonationCard donation={donation} />
              </div>
            ))}
          </div>
        </main>

      </div>
    </Layout>
  )
}

export default DonationTracker