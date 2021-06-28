import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { institution, amount } = req.body

  const session = await getSession({ req })
  const result = await prisma.donation.create({
    data: {
      institution: institution,
      amount: amount,
      author: { connect: { email: session?.user?.email } },
      published: true,
      
    },
  })
  res.json(result)
}