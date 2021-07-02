import React, {FC} from "react";
import ReactMarkdown from "react-markdown";
import layoutStyles from "../styles/InstitutionStyles.module.css";
import textStyles from "../styles/Home.module.css";
import {numberFormat} from '../pages/index';

interface InstitutionCardProps {
    institution : InstitutionType;
};

export type InstitutionType = {
    amount : number;
    id : number;
    institutionName : string;
    institutionCity : string;
    institutionNeighbourhood ?: string;
    institutionWebsite : string;
}

const InstitutionCard: FC<InstitutionCardProps> = ({institution}: InstitutionCardProps)=> {

    const locationString : string = institution.institutionCity + `${institution.institutionNeighbourhood ? `, ${institution.institutionNeighbourhood}` : ''}`;

    return (
        <div className={layoutStyles.institutionContainer}>

            <ReactMarkdown className={textStyles.header} children={institution.institutionName} />
            <ReactMarkdown className={textStyles.bodyText} children={locationString} />
            <ReactMarkdown className={textStyles.bodyText} children={`Amount donated to date: ${numberFormat.format(institution.amount)}`} />
            <style jsx>{`
                div {
                background-color: rgba(17, 31, 154, 1);;
                padding: 1rem;
                }
            `}</style>
        </div>
    );
};

export default InstitutionCard;