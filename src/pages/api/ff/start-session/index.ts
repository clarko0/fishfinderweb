/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
//new
import { genRanHex } from "@/storage/constants/misc";
import { compareArrays } from "@/storage/utils/tools";
import { VerifyAuth } from "@/storage/utils/web3";
import { UTILS } from "@/utils/utils";
import Web3 from "web3";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.worldofdefish.com",
});

export default async function handler(req: any, res: any) {
  try {
    const web3 = new Web3();
    UTILS.MongoDb.connectToDatabase().then(async (result: any) => {
      const { client, db } = result;
      if (req.method !== "POST") {
        res.status(405).send({ message: "Server Error" });
      }

      const body = req.body;
      const bodyKeys: string[] = Object.keys(body);
      const reqKeys: string[] = [
        "address",
        "auth",
        "level",
        "keep_zones",
        "keep_sets",
        "skip_repair",
      ];
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
      if (
        !(
          typeof body.keep_sets === "boolean" &&
          typeof body.keep_zones === "boolean" &&
          typeof body.skip_repair === "boolean"
        )
      ) {
        throw new Error("Bad data type for keepsets or keepzones");
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
      await db.collection("ffusers").updateOne(
        { address: body.address },
        {
          $set: {
            ["setting.keep_sets"]: body.keep_sets,
            ["setting.keep_zones"]: body.keep_zones,
            ["setting.skip_repair"]: body.skip_repair,
          },
        }
      );
      await db.collection("ffpending").insertOne({
        address: body.address,
        auth: body.auth,
        char_level: body.level,
        session_id: genRanHex(32),
      });
      const session_ids = await (
        await api.get(`/zones/active/offchain/select/all`, {
          headers: {
            Authorization: body.auth,
          },
        })
      ).data;
      const results = [];
      for (let i = 0; i < session_ids.length; i++) {
        const response = await api.get(
          `/zones/${session_ids[i]}/expanded-offchain`,
          {
            headers: {
              Authorization: body.auth,
            },
          }
        );
        results.push(response.data);
      }
      const log = await db.collection("fflogs").insertOne({
        address: body.address,
        auth: body.auth,
        char_level: body.level,
        time_stamp: Math.round(new Date().getTime() / 1000),
        current_sessions: results.map((item: any) => ({
          zone_id: item.id,
          items: item.fishing_session.slot_items.map((_: any) => {
            return _.id;
          }),
        })),
        is_start: true,
      });
      await client.close();
      res.status(200).json({});
    });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
