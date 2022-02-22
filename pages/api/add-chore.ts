import connectToDatabase from '../../lib/mongo-connect';

/**
 * @swagger
 * /api/add-chore:
 *  post:
 *   description: Add a new chore to the database
 *   requestBody:
 *    description: The new chore to add
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: 'http://localhost:3000/schema.json#/components/schema/Chore'
 *   responses:
 *     '200':
 *       description: Successfully added the chore
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             description: A message to display to the user
 *             example: Chore added successfully
 *            success:
 *             type: boolean
 *             description: Whether the operation was successful
 *             example: true
 */

export default async function addChores(req, res) {
  try {
    const { db } = await connectToDatabase();
    const chores = db.collection('chores');
    const newChore = JSON.parse(req.body);

    await chores.insertOne(newChore);
    res.json({
      success: true,
      message: `'${newChore.content}' added successfully`
    });
  } catch (err) {
    res.json({
      success: false,
      message: new Error(err).message
    });
  }
}
