import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
import checkAuth from "~/middleware/checkAuth";
import { ClientError, handleError } from "~/utils/api/error";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    const loggedUser = checkAuth(req);

    switch (method) {
      case "GET":
        {
          const { cursor, limit = 10 } = req.query;
          const items = await prisma.shoppingItem.findMany({
            where: {
              userId: loggedUser.id,
            },
            take: Number(limit),
            orderBy: {
              createdAt: "desc",
            },
            cursor: cursor
              ? {
                  id: Number(cursor),
                }
              : undefined,
          });
          res.status(200).json({
            data: {
              items,
              nextCursor:
                items.length && items.length === limit
                  ? items[items.length - 1].id
                  : "",
            },
          });
        }
        break;
      case "POST":
        {
          const { name, note, imageUrl, category } = req.body;

          if (!category || !name) throw new ClientError("missing/empty fields");
          const existingItem = await prisma.shoppingItem.findFirst({
            where: {
              userId: loggedUser.id,
              name: name,
            },
          });
          if (existingItem) throw new ClientError("item already exists");

          const newItem = await prisma.shoppingItem.create({
            data: {
              name,
              note,
              imageUrl,
              createdAt: new Date().toISOString(),
              category,
              user: {
                connect: {
                  id: loggedUser.id,
                },
              },
            },
          });
          res.status(200).json({ data: newItem });
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    handleError(error, res);
  }
}
