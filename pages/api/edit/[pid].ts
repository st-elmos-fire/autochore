import connectToDatabase from "../../../lib/mongo-connect";

export default async function editChore(req, res) {
    try {
        const { db } = await connectToDatabase();
        const chores = db.collection("chores");
    
        console.log(req.body);

        // await chores.deleteOne({ content: req.query.pid });

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