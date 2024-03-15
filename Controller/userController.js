import prisma from "../DB/db_config.js";

export const createUserHandler = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password


        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (findUser) {
            res.json({ status: 400, message: `User is alredy taken this email. Use another Email` })
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password
            },
        });

        return res.json({ status: 200, message: "newUser is created Successfully", data: { newUser } });

    } catch (error) {
        return res.json({ status: 400, message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            // include: {
            //     // post : true // Its give all user Posts
            //     post: {
            //         select: { //When i want only specific post content
            //             title: true,
            //             comment_count: true
            //         }

            //     }
            // }
            select : { //It's Give all about counting user post
                _count : {
                    select : {
                        post : true
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            length: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const users = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
        });
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "Data is not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                users
            }
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

export const userUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;

        const updateduser = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        // console.log(updateduser, "=");
        return res.status(201).json({
            success: true,
            message: "Data Successfully updated",
            data: {
                updateduser
            }
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: error.message
        });
    }

}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const remove = await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        });

        return res.status(201).json({
            success: true,
            message: "User delete successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
}