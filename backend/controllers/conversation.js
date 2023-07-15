const prisma = require("../db");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getAllConversation = async (req, res) => {
    try {
        const {email} = req.auth;
        if (!email) return res.status(400).json({msg: "Email tidak valid"});
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                conversations_one: {
                    select: {
                        id: true,
                        user_two: true,
                        is_delete: true,
                        messages: {
                            take: 1,
                            orderBy: {
                                createdAt: "desc",
                            },
                        },
                    },
                },
                conversations_two: {
                    select: {
                        id: true,
                        is_delete: true,
                        user_one: true,
                        messages: {
                            take: 1,
                            orderBy: {
                                createdAt: "desc",
                            },
                        },
                    },
                },
            },
        });

        if (!user) return res.status(400).json({msg: "ada yang tidak beres"});
        const conversations = user.conversations_one
            .map((data) => {

                return {
                    conversationId: data.id,
                    user: data.user_two,
                    is_delete: data.is_delete,
                    lastMessage: {
                        message: data.messages[0].content,
                        createdAt: data.messages[0].createdAt,
                    },
                };
            })
            .concat(
                user.conversations_two.map((data) => {
                    return {
                        conversationId: data.id,
                        user: data.user_one,
                        is_delete: data.is_delete,

                        lastMessage: {
                            message: data.messages[0].content,
                            createdAt: data.messages[0].createdAt,
                        },
                    };
                })
            )
            .sort((a, b) => {
                return a.lastMessage.createdAt > b.lastMessage.createdAt
                    ? -1
                    : a.lastMessage.createdAt < b.lastMessage.createdAt
                        ? 1
                        : 0;
            })
            .map((data) => {
                const {conversationId, lastMessage, user} = data;
                return {
                    conversationId,
                    is_delete: data.is_delete,

                    lastMessage: {createdAt: lastMessage.createdAt, content: lastMessage.message},
                    user,
                };
            }).filter(data => {
                return data.is_delete !== req.auth.id
            })
        // console.log(req.auth, conversations)
        return res.json({conversations});
    } catch (e) {
        console.log(e)
    }
};
exports.getConversation = async (req, res) => {
    const {conversationId} = req.query;
    if (!conversationId) return res.status(400).json({msg: "ID tidak valid"});
    const messages = await prisma.conversation.findUnique({
        where: {
            id: conversationId,
        },
        select: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                where: {
                    OR: [
                        {is_delete: {not: req.auth.id}},
                        {is_delete: null}
                    ],
                }
            },
        },
    });
    console.log(req.auth)
    return res.json(messages);
};

exports.deleteConversation = async (req, res) => {
    try {
        const {id} = req.auth
        const conversationId = req.params.id
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,


            }
        })
        if (conversation.is_delete) {
            await prisma.conversation.delete({
                where: {
                    id: conversation.id
                }
            })
        } else {
            await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    is_delete: id
                }
            })
            await prisma.message.updateMany({
                where: {
                    conversation_id: conversationId,

                },
                data: {
                    is_delete: id
                }
            })
        }

        return res.status(200).json({
            data: {
                message: "Percakapan berhasil di hapus"
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({errors: e})
    }
}