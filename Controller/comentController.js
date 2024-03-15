import prisma from "../DB/db_config.js";

export const createComment = async (req, res) => {
    try {
        const { user_id, post_id, comment } = req.body;
        await prisma.post.update({
            where : {
                id : Number(post_id)
            },
            data : {
                comment_count : {
                    increment : 1
                }
            }
        })
        const newComment = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment
            },
        });

        return res.json({ status: 200, message: "newComment is created Successfully", data: { newComment } });

    } catch (error) {
        return res.json({ status: 400, message: error.message });
    }
}

export const getAllComment = async (req, res) => {
    try {
        const comment = await prisma.comment.findMany({});
        return res.status(200).json({
            success: true,
            length: comment.length,
            data: {
                comment
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const showComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const post = await prisma.comment.findFirst({
            where: {
                id: Number(commentId)
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

// export const CommentUpdate = async (req, res) => {
//     try {
//         const commentId = req.params.id;
//         const { user_id, post_id, comment } = req.body;

//         const updatedPost = await prisma.comment.update({
//             where: {
//                 id: Number(commentId)
//             },
//             data: {
//                 user_id: Number(user_id),
//                 post_id: Number(post_id),
//                 comment
//             }
//         });
//         // console.log(updateduser, "=");
//         return res.status(201).json({
//             success: true,
//             message: "Data Successfully updated",
//             data: {
//                 updatedPost
//             }
//         });
//     } catch (error) {
//         return res.status(201).json({
//             success: false,
//             message: error.message
//         });
//     }

// }

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        // await prisma.post.update({
        //     where : {
        //         id : Number(post_id)
        //     },
        //     data : {
        //         comment_count :{
        //             decrement : 1
        //         }
        //     }
        // })
        const remove = await prisma.comment.delete({
            where: {
                id: Number(commentId)
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