/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default function handler(req: any, res: any) {
  res.status(200).json({ data: "Welcome to Fish Finder's api" });
}
