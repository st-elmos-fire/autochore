import connectToDatabase from "../../../lib/mongo-connect";

export default async function editChore(req, res) {
    try {
        const { db } = await connectToDatabase();
        const chores = db.collection("chores");
    
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
    } 
    catch (err) {
        res.json({
            success: false,
            message: new Error(err).message
        });
    }   
}