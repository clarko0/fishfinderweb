/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

import { compareArrays } from "@/storage/utils/tools";
import { connectToDatabase } from "@/util/mongodb";

export default async function handler(req: any, res: any) {
  try {
    connectToDatabase().then(async (result: any) => {
      const { client, db } = result;

      if (req.method !== "POST") {
        res.status(405).send({ message: "Server Error" });
      }
      const body = req.body;
      const bodyKeys: string[] = Object.keys(body);
      const reqKeys: string[] = ["session_id"];
      if (!compareArrays(bodyKeys, reqKeys)) {
        throw new Error("Invalid body");
      }
      console.log(body.session_id);
      if (body.session_id.length !== 32) {
        throw new Error("Invalid session_id");
      }
      const pending = await db
        .collection("ffpending")
        .find({ session_id: body.session_id })
        .toArray();
      const active = await db
        .collection("ffrunning")
        .find({ session_id: body.session_id })
        .toArray();
      if (pending.length === 0 && active.length === 0) {
        res.status(200).send({});
      }
      await db
        .collection("ffpending")
        .deleteOne({ session_id: body.session_id });
      await db
        .collection("ffrunning")
        .deleteOne({ session_id: body.session_id });
      await client.close();
      res.status(200).send({});
    });
  } catch (e) {
    res.status(500).send({ message: "Server Error" });
  }
}
