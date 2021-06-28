import React, {FC} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "../styles/DonationOverviewStyles.module.css";
import textStyles from "../styles/Home.module.css";

interface SingleDonationProps {
  donation: Donation
};

export type Donation = {
    id: string,
    institution: string,
    amount: number,
    date : string,
}

const SingleDonationCard: FC<SingleDonationProps> = (donationProps)=> {
    return (
        <div className={`${styles.cardContainer} ${styles.donationContainer}`}>
          <ReactMarkdown className={textStyles.smallBodyText} children={donationProps.donation.institution} />
          <ReactMarkdown className={textStyles.smallBodyText} children={`$${donationProps.donation.amount}`} />
        </div>
    );
};

export default SingleDonationCard;