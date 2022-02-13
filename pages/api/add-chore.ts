import connectToDatabase from "../../lib/mongo-connect";

export default async function addChores(req, res) {
    try {
        const { db } = await connectToDatabase();
        const chores = db.collection("chores");
    
        const result = await chores.insertOne(JSON.parse(req.body));
        res.json({
            success: true,
            message: "Chore added successfully"
        });
    } 
    catch (err) {
        res.json({
            success: false,
            message: new Error(err).message
        });
    }   
}