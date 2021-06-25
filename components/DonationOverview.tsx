import React, {FC} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "../styles/DonationOverviewStyles.module.css";
import textStyles from "../styles/Home.module.css";
import {withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface DonationOverviewProps {
  amount: PeriodAmount
};

export type PeriodAmount = {
  year: number,
  month: number,
  day: number,
}

const StyledFormControl = withStyles({
  root: {
    margin: 'auto',
  },
}) (FormControl);

const StyledSelect = withStyles({
  root: {
    color: '#FFA05A',
    fontSize: 24,
    fontFamily: 'Futura',
  },
  icon: {
    color: '#FFA05A',
  },
  
}) (Select);


const DonationOverview: FC<DonationOverviewProps> = ({amount} : DonationOverviewProps)=> {
    const periodStrings : string[] = ['year', 'month', 'day'];
    const [selectedPeriodID, setSelectedPeriodID] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
      setSelectedPeriodID(event.target.value);
    };

    return (
        <div className={styles.cardContainer}>
          
          <h2 className={textStyles.header}>Donations for this</h2>

          <div>
              <StyledFormControl>
              <StyledSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedPeriodID}
                  onChange={handleChange}
              >
                  <MenuItem className={styles.button} value={0}>Year</MenuItem>
                  <MenuItem className={styles.button} value={1}>Month</MenuItem>
                  <MenuItem className={styles.button} value={2}>Day</MenuItem>
              </StyledSelect>
              </StyledFormControl>

          </div>
          
          <ReactMarkdown className={textStyles.bodyText}children={`$${amount[periodStrings[selectedPeriodID]]}`} />
          <style jsx>{`
              div {
              background-color: rgba(17, 31, 154, 1);;
              padding: 1rem;
              }
          `}</style>
        </div>
    );
};

export default DonationOverview;