import Users from "../model/userSchema.js";

async function checkPassword(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { password } = request.body;

        if (password === user.password){
            return response.status(200).json(true)
        }
        else {
            return response.status(404).json({message: "Incorrect Password."})
        }
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    checkPassword
}