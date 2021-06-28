import textStyles from '../styles/Home.module.css';
import layoutStyles from '../styles/DonationOverviewStyles.module.css';
import Layout from "../components/Layouts"
import DonationOverview, { PeriodAmount} from "./DonationOverview";
import SingleDonationCard, {Donation} from "./SingleDonationCard";

export type TrackerProps = {
    session: any,
    periodAmounts: PeriodAmount,
    donations: Donation[]
  }
  
export const DonationTracker: React.FC<TrackerProps> = (props : TrackerProps) => {
    return (
        
        <div className="page">
  
          {props.session ? <main className={layoutStyles.mainContainer}>
  
            <DonationOverview amount={props.periodAmounts}/>
            <div className={layoutStyles.donationListContainer}>
              <h1 className={textStyles.smallBodyText}>Where Money Has Gone</h1>
              
              {props.donations.map((donation) => (
                <div key={donation.id} className="post">
                  <SingleDonationCard donation={donation} />
                </div>
              ))}
            </div>
          </main>
          :
          <a className={`${textStyles.xlBodyText} ${textStyles.hyperlink}`} href="/api/auth/signin">Log in to start tracking donations</a>
          }
          
        </div>
    )
  }