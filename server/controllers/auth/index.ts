import { User } from "../../models/user";

export const signUp = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send("User already exists");
    }
    else {
      const user = await new User(req.body);
      const newUser = await user.save();
      console.log(user);
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}