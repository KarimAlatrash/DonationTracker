import React from 'react';
import InstitutionCard, {InstitutionType} from './InstitutionCard'
import layoutStyles from '../styles/InstitutionStyles.module.css'
import textStyles from '../styles/Home.module.css'
import ReactMarkdown from "react-markdown";

interface InstitutionListProps {
    institutionList : InstitutionType[];
};

const InstitutionList : React.FC<InstitutionListProps> = ( {institutionList} : InstitutionListProps) => {
    return (
        <div className={layoutStyles.bodyLayout}>
            <ReactMarkdown className={`${textStyles.orange} ${textStyles.header}`} children={'Where people have donated'} />
            <div className={layoutStyles.layoutContainer}>
                {institutionList.map((institution, id) => (
                    <InstitutionCard key={id} institution={institution}/>
                ))}
            </div>
        </div>
    );
}

export default InstitutionList;