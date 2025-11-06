import User from "../models/userModel.js";

 const getAllUsers=async (req, res)=>{
    try {
        const users= await User.find();
        if(!users || users.length==0){
            return res.send({
                message:"User not found",
                status:false
            })
        }
        res.send({
            message:"All users",
            status:true,
            users
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req, res)=>{
    try {
        const id=req.params.id;
        const user= await User.findByIdAndDelete({_id:id}).select({password:0})
        res.send({
            status:true,
            message:"User deleted successfully",
            user
        })
    } catch (error) {
        res.send({
            status:false,
            message:"Error in deleting user"
        })
    }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    await user.updateOne(updateData);

    // Fetch updated user without password
    const updatedUser = await User.findById(id).select("-password");

    res.send({
      status: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error while updating user",
      error: error.message,
    });
  }
};


export {getAllUsers, deleteUser, updateUser}