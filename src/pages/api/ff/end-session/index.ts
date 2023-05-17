/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

import { getSessionInfo } from "@/storage/utils/fetch";
import { endSession } from "@/storage/utils/fetch";
import { GetActiveZone } from "@/storage/utils/fetch";
import { compareArrays, sleep } from "@/storage/utils/tools";
import { connectToDatabase } from "@/util/mongodb";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.worldofdefish.com",
});

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
      const pending = await db.collection("ffpending");
      const active = await db.collection("ffrunning");
      const fishing_history_coll = await db.collection("fffishing_history");
      if (
        (await pending.find({ session_id: body.session_id }).toArray()
          .length) === 0 &&
        (await active.find({ session_id: body.session_id }).toArray()
          .length) === 0
      ) {
        res.status(200).send({});
      }
      let authToken = await active
        .find({ session_id: body.session_id })
        .toArray();
      let userData = { address: "", auth: "", user_level: "", is_start: false };
      if (authToken.length > 0) {
        userData.address = authToken[0].address;
        userData.auth = authToken[0].auth;
        userData.user_level = authToken[0].char_level;
        authToken = authToken[0].auth;
      }
      const session_ids = await (
        await api.get(`/zones/active/offchain/select/all`, {
          headers: {
            Authorization: authToken,
          },
        })
      ).data;
      const results = [];
      for (let i = 0; i < session_ids.length; i++) {
        const response = await api.get(
          `/zones/${session_ids[i]}/expanded-offchain`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        results.push(response.data);
      }
      const data = results.map((item: any) => ({
        wodFarmed: item.fishing_session.last_saved_wod_earned,
        nftFarmed: item.fishing_session.pending_drops.concat(
          item.fishing_session.claimed_materials
        ),
        session_id: item.fishing_session._id,
      }));

      data.length > 0 && (await fishing_history_coll.insertMany(data));
      await db
        .collection("ffpending")
        .deleteOne({ session_id: body.session_id });
      await db
        .collection("ffrunning")
        .deleteOne({ session_id: body.session_id });
      for (let i = 0; i < data.length; i++) {
        const res = await api.post(
          `/fishing/${data[i].session_id}/end`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
      }
      const log = await db.collection("fflogs").insertOne(userData);
      await client.close();
      res.status(200).send({});
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server Error" });
  }
}
