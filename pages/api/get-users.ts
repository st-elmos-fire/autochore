import connectToDatabase from '../../lib/mongo-connect';

const getUsers = async (req, res) => {
  const { db } = await connectToDatabase();

  const users = await db.collection('users').find({}).toArray();

  res.json(users);
};

export default getUsers;
