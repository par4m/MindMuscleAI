import User from "../../../models/User";
import dbConnect from "../../../utils/mongodb";
import authMiddleware from "../../../middleware/authMiddleware";
/*
List of users 
*/

// TODO: Secure this list with a middleware

export default async function listAllUsers(req, res) {
  await dbConnect();
  await authMiddleware(req, res, async () => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
}
