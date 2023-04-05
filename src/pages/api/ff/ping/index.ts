/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

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
      const reqKeys: string[] = ["address", "auth", "wod_balance"];
      if (!compareArrays(bodyKeys, reqKeys)) {
        throw new Error("Invalid Body");
      }
      if (!VerifyAuth(body.auth, body.address)) {
        throw new Error("Auth token is not owned by address");
      }
      if (!web3.utils.isAddress(body.address)) {
        throw new Error("Invalid address");
      }
      if (isNaN(parseInt(body.wod_balance))) {
        throw new Error("Wod Balance is NaN");
      }
      const user = await db
        .collection("ffusers")
        .find({ address: body.address })
        .toArray();
      let wod = 0;
      if (user.length === 0) {
        await db.collection("ffusers").insertOne({
          address: body.address,
          wod_balance: body.wod_balance,
        });
        wod = body.wod_balance;
      } else {
        wod = user[0].wod_balance;
      }
      const pending = await db
        .collection("ffpending")
        .find({ address: body.address })
        .toArray();
      const active = await db
        .collection("ffrunning")
        .find({ address: body.address })
        .toArray();
      const data = await db
        .collection("ffnextrepair")
        .find()
        .sort()
        .limit(1)
        .toArray();
      let status: string;

      let isFishing: boolean = false;
      if (pending.length === 0 && active.length === 0) {
        status = "Not Started";
      } else if (pending.length >= 1 && active.length === 0) {
        status = "Pending";
      } else {
        status = "Running";
        isFishing = true;
      }

      let sessions: any[] = [];
      try {
        sessions = active[0].active_sessions;
      } catch (e) {}
      let session_id = null;
      try {
        session_id = active[0].session_id;
      } catch (e) {}

      try {
        session_id = pending[0].session_id;
      } catch (e) {}
      await client.close();
      res.status(200).send({
        next_repair: data[0].next_repair,
        wod_signup: wod,
        status: status,
        bool: isFishing,
        sessions: sessions,
        session_id: session_id,
      });
    });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
