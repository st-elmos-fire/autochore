import connectToDatabase from '../../lib/mongo-connect';

/**
 * @swagger
 * /api/get-chores:
 *   get:
 *     description: Get all chores from the database
 *     responses:
 *      '200':
 *         description: An array of chores
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: 'http://localhost:3000/schema.json#/components/schema/Chore'
 */

const getChores = async (req, res) => {
  const { db } = await connectToDatabase();

  const chores = await db.collection('chores').find({}).toArray();

  res.json(chores);
};

export default getChores;
