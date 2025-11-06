import bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password, phone, answer } = req.body;

        if (!name || !email || !password || !phone || !answer ) {
            return res.status(400).send({
                status: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                status: false,
                message: "User already exists"
            });
        }

        // Hash the password with salt rounds = 10
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            answer,
        });
        await user.save();

        res.status(201).send({
            status: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({
            status: false,
            message: "Server error"
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                status: false,
                message: "Please enter email and password"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                status: false,
                message: "User does not exist"
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                status: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).send({
            status: true,
            username:user.name,
            message: "User logged in successfully",
            token,
            email:user.email,
            userId:user._id
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Login Server error"
        });
    }
};


const forgetPasswordController=async (req, res)=>{
    const {email,newPassword, answer}= req.body;
    if(!email || !newPassword || !answer){
        return res.status(400).send({
            message:"All fields are required",
            status:false,
        })
    }
    const user= await User.findOne({email,answer});
    if(!user){
        return res.status(404).send({
            message:"User does not exist or answer is incorrect",
            status:false,
        })
    }
    const hashed = await bcrypt.hash(newPassword,10);
    await User.findByIdAndUpdate(user._id,{password:hashed })
    res.status(200).send({
        message:"Password reset successfully",
        status:true
    })
}

export { loginController, register, forgetPasswordController };
