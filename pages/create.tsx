// pages/create.tsx

import React, { useState } from 'react'
import Layout from '../components/Layouts'
import Router from 'next/router'
import layoutStyles from '../styles/NewDonationStyles.module.css'
import textStyles from '../styles/Home.module.css'

const Draft: React.FC = () => {
  const [institution, setInstitution] = useState('')
  const [amount, setAmount] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
        const body = {institution: institution, amount: amount}
        await fetch('api/post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        await Router.push('/')
    }
    catch(err) {
        console.error(err);
    }
  }

  return (
    <Layout>
      <div className={layoutStyles.formContainer}>
        <h1>New Donation</h1>
        <form onSubmit={submitData} className={layoutStyles.form}>
          <input
            autoFocus
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Insitution Name"
            type="text"
            value={institution}
            className={layoutStyles.formField}
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            type="number"
            value={amount}
            className={layoutStyles.formField}
          />
          <input className={`${layoutStyles.confirmButton} ${textStyles.bodyText}`} disabled={!amount || !institution} type="submit" value="Create" />
          <a className={`${textStyles.bodyText} ${textStyles.orange}`} href="#" onClick={() => Router.push('/')}>
            Cancel
          </a>
        </form>
      </div>
      
    </Layout>
  )
}

export default Draft