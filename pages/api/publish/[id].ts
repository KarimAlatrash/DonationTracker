import prisma from '../../../lib/prisma'

// PUT /api/publish/:id
export default async function handle(req, res) {
  const donationId = req.query.id
  const donation = await prisma.donation.update({
    where: { id: Number(donationId) },
    data: { published: true },
  })
  res.json(donation)
}