import Users from "../model/userSchema.js";
import bucket from "../firebase/firebaseConfig.js";

async function addImage(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        if (!request.file){
            return response.status(404).json({message: "File Not Found."});
        }

        const filename = Date.now() + "-" + request.file.originalname;

        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: request.file.mimetype
            }
        })

        blobStream.on("error", (error) => {
            response.status(500).json({message: error.message});
        })

        blobStream.on("finish", async() => {
            await blob.makePublic();

            const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            await Users.updateOne({"_id": user._id}, {image: url});

            response.status(200).json(url);
        })

        blobStream.end(request.file.buffer);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addGender(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { gender } = request.body;

        await Users.updateOne({"_id": user._id}, {gender})

        return response.status(200).json({message: "Gender added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addState(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { state } = request.body;

        await Users.updateOne({"_id": user._id}, {state})

        return response.status(200).json({message: "State added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addBio(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { bio } = request.body;

        await Users.updateOne({"_id": user._id}, {bio})

        return response.status(200).json({message: "State added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addAddress(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { address } = request.body;

        await Users.updateOne({"_id": user._id}, {address})

        return response.status(200).json({message: "Address added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addPincode(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { pincode } = request.body;

        await Users.updateOne({"_id": user._id}, {pincode})

        return response.status(200).json({message: "Pincode added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addCity(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { city } = request.body;

        await Users.updateOne({"_id": user._id}, {city})

        return response.status(200).json({message: "City added successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function updateAddress(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { address } = request.address;

        await Users.updateOne({"_id": user._id}, {address});

        return response.status(200).json({message: "Address updated successfully."})
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    addImage,
    addBio,
    addGender,
    addState,
    addAddress,
    addPincode,
    addCity,
    updateAddress
}