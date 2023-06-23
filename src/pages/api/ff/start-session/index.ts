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
  UTILS.MongoDb.connectToDatabase().then(async (result: any) => {
    const { client, db } = result;
    try {
      const web3 = new Web3();
      if (req.method !== "POST") {
        res.status(405).send({ message: "Server Error" });
      }

      const body = req.body;
      const bodyKeys: string[] = Object.keys(body);
      const reqKeys: string[] = [
        "address",
        "auth",
        "keep_zones",
        "keep_sets",
        "skip_repair",
        "repair_level",
      ];
      if (!compareArrays(bodyKeys, reqKeys)) {
        throw new Error("Invalid body");
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
      if (!([1, 2, 3].indexOf(body.repair_level) !== -1)) {
        throw new Error("Invalid repair level");
      }

      const PENDING_COLL = await db.collection("ffpending");
      const USER_COLL = await db.collection("ffusers");
      const LOGS_COLL = await db.collection("fflogs");
      const RUNNING_COLL = await db.collection("ffrunning");

      const pending = await PENDING_COLL.findOne({ address: body.address });

      const active = await RUNNING_COLL.findOne({ address: body.address });
      if (active) {
        throw new Error("User is already fishing");
      }

      await USER_COLL.updateOne(
        { address: body.address },
        {
          $set: {
            ["setting.keep_sets"]: body.keep_sets,
            ["setting.keep_zones"]: body.keep_zones,
            ["setting.skip_repair"]: body.skip_repair,
            ["setting.repair_level"]: body.repair_level,
          },
        }
      );

      if (pending) {
        await PENDING_COLL.updateOne(
          {
            address: body.address,
          },
          {
            $set: {
              auth: body.auth,
              session_id: genRanHex(32),
            },
          }
        );
      } else {
        await PENDING_COLL.insertOne({
          address: body.address,
          auth: body.auth,
          session_id: genRanHex(32),
        });
      }

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
      await LOGS_COLL.insertOne({
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
    } catch (e: any) {
      console.log(e.message);
      res.status(500).json({ message: e.message });
    }
  });
}
