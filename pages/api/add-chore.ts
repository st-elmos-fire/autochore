import connectToDatabase from '@helpers/mongo-connect';

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
