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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        if (page <= 0) {
            page = 1
        }
        if (limit <= 0 && limit > 100) {
            limit = 10;
        }
        const skip = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            skip: skip,
            take: limit,
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
            orderBy: {
                id: 'asc'
            },
            where: {
                NOT: [
                    {
                        title: {
                            startsWith: "So"
                        }
                    }, {
                        title: {
                            endsWith: "in Reality"
                        }
                    }


                ]
            }
        });
        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / limit);
        return res.status(200).json({
            success: true,
            length: posts.length,
            data: {
                posts
            },
            meta: {
                totalPosts,
                currentPage: page,
                totalPages,
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
export const searchPost = async (req, res) => {
    try {
        const query = req.params.query;
        // console.log(query, "hgj");
        const posts = await prisma.post.findMany({
            where: {
                description: {
                    search: query
                }
            }
        });
        return res.status(200).json({
            data: {
                posts
            }
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        });
    }

}