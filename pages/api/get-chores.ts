import connectToDatabase from "../../lib/mongo-connect";

const getChores = async (req, res) => {
  const { db } = await connectToDatabase();

  const chores = await db
    .collection("chores")
    .find({})
    .toArray();

  res.json(chores);
};

export default getChores;