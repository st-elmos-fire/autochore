import connectToDatabase from "../../../lib/mongo-connect";

export default async function deleteChore(req, res) {
    try {
        const { db } = await connectToDatabase();
        const chores = db.collection("chores");
    
        console.log(req);

        await chores.deleteOne({ content: req.query.pid });

        res.json({
            success: true,
            message: `${req.query.pid} deleted successfully`
        });
    } 
    catch (err) {
        res.json({
            success: false,
            message: new Error(err).message
        });
    }   
}