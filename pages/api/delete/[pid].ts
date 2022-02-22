import connectToDatabase from '../../../lib/mongo-connect';

/**
 * @swagger
 * /api/edit/{pid}:
 *  delete:
 *    description: Delete a chore in the database
 *  parameters:
 *   - in: path
 *     name: pid
 *     required: true
 *     description: The name of the chore to edit
 *     schema:
 *      type: string
 *
 *  responses:
 *    '200':
 *      description: Successfully deleted the chore
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *            description: A message to display to the user
 *            example: Chore deleted successfully
 *           success:
 *            type: boolean
 *            description: Whether the operation was successful
 *            example: true
 */

export default async function deleteChore(req, res) {
  try {
    const { db } = await connectToDatabase();
    const chores = db.collection('chores');

    console.log(req);

    await chores.deleteOne({ content: req.query.pid });

    res.json({
      success: true,
      message: `${req.query.pid} deleted successfully`
    });
  } catch (err) {
    res.json({
      success: false,
      message: new Error(err).message
    });
  }
}
