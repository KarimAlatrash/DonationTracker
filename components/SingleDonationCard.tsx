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

const SingleDonationCard: FC<SingleDonationProps> = (donationProps : SingleDonationProps)=> {
    return (
        <div className={`${styles.cardContainer} ${styles.donationContainer}`}>
          <ReactMarkdown className={textStyles.bodyText} children={donationProps.donation.institution} />
        </div>
    );
};

export default SingleDonationCard;