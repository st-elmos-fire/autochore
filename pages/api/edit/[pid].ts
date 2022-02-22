import connectToDatabase from '../../../lib/mongo-connect';

/**
 * @swagger
 * /api/edit/{pid}:
 *  patch:
 *    description: Edit a chore in the database
 *    requestBody:
 *     description: The new data for the existing chore
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          $ref: 'http://localhost:3000/schema.json#/components/schema/Chore'
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
 *      description: Successfully edited the chore
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *            description: A message to display to the user
 *            example: Chore edited successfully
 *           success:
 *            type: boolean
 *            description: Whether the operation was successful
 *            example: true
 */

export default async function editChore(req, res) {
  try {
    const { db } = await connectToDatabase();
    const chores = db.collection('chores');

    const body = JSON.parse(req.body);

    await chores.updateOne(
      { content: req.query.pid },
      { $set: body },
      { upsert: true },
      (err: unknown) => {
        if (err) return console.log(err);
      }
    );

    res.json({
      success: true,
      message: `${req.query.pid} edited successfully`
    });
  } catch (err) {
    res.json({
      success: false,
      message: new Error(err).message
    });
  }
}
