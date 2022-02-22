import connectToDatabase from '../../lib/mongo-connect';

/**
 * @swagger
 *
 * /api/get-users:
 *  get:
 *   description: Get all users from the database
 *   responses:
 *    '200':
 *      description: An array of users
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: 'http://localhost:3000/schema.json#/components/schema/User'
 */

const getUsers = async (req, res) => {
  const { db } = await connectToDatabase();

  const users = await db.collection('users').find({}).toArray();

  res.json(users);
};

export default getUsers;
