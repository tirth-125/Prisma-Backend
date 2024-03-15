import prisma from "../DB/db_config.js";

export const createPost = async (req, res) => {
    try {
        const { user_id, title, description } = req.body

        const newPost = await prisma.post.create({
            data: {
                user_id: Number(user_id),
                title,
                description
            },
        });

        return res.json({ status: 200, message: "newPost is created Successfully", data: { newPost } });

    } catch (error) {
        return res.json({ status: 400, message: error.message });
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                Comment: {
                    include: {
                        // user :true // So it's give Which user comment on this post and define the user
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy : {
                id:'asc'
            }
        });

        return res.status(200).json({
            success: true,
            length: posts.length,
            data: {
                posts
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const showPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await prisma.post.findFirst({
            where: {
                id: Number(postId)
            },
        });
        return res.status(200).json({
            success: true,
            data: {
                post
            }
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

export const postUpdate = async (req, res) => {
    try {
        const postId = req.params.id;
        const { user_id, title, description } = req.body

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {
                user_id: Number(user_id),
                title,
                description
            }
        });
        // console.log(updateduser, "=");
        return res.status(201).json({
            success: true,
            message: "Data Successfully updated",
            data: {
                updatedPost
            }
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: error.message
        });
    }

}

export const deletePost = async (req, res) => {
    try {
        const userId = req.params.id;
        const remove = await prisma.post.delete({
            where: {
                id: Number(userId)
            }
        });

        return res.status(201).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
}