/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
//new
import { genRanHex } from "@/storage/constants/misc";
import { compareArrays } from "@/storage/utils/tools";
import { VerifyAuth } from "@/storage/utils/web3";
import { connectToDatabase } from "@/util/mongodb";
import Web3 from "web3";

export default async function handler(req: any, res: any) {
  try {
    const web3 = new Web3();
    connectToDatabase().then(async (result: any) => {
      const { client, db } = result;
      if (req.method !== "POST") {
        res.status(405).send({ message: "Server Error" });
      }

      const body = req.body;
      const bodyKeys: string[] = Object.keys(body);
      const reqKeys: string[] = ["address", "auth", "level"];
      if (!compareArrays(bodyKeys, reqKeys)) {
        throw new Error("Invalid body");
      }
      if (isNaN(parseInt(body.level))) {
        throw new Error("Invalid level");
      }
      if (!web3.utils.isAddress(body.address)) {
        throw new Error("Invalid address");
      }
      if (!VerifyAuth(body.auth, body.address)) {
        throw new Error("Auth token is not owned by address");
      }
      const pending = await db
        .collection("ffpending")
        .find({ projection: { address: body.address } })
        .toArray();
      const active = await db
        .collection("ffpending")
        .find({ projection: { address: body.address } })
        .toArray();
      if (pending.length >= 1 || active.length >= 1) {
        throw new Error("Already have an active session");
      }
      await db.collection("ffpending").insertOne({
        address: body.address,
        auth: body.auth,
        char_level: body.level,
        session_id: genRanHex(32),
      });
      const log = await db.collection("fflogs").insertOne({
        address: body.address,
        auth: body.auth,
        char_level: body.level,
        is_start: true,
      });
      await client.close();
      res.status(200).json({});
    });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
