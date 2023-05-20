import { compareArrays } from "@/storage/utils/tools";
import { connectToDatabase } from "@/util/mongodb";
import Web3Token from "web3-token";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req: any, res: any) {
  try {
    connectToDatabase().then(async (result: any) => {
      const { client, db } = result;

      if (req.method !== "POST") {
        res.status(405).send({ message: "Server Error" });
      }
      const body = req.body;
      const bodyKeys: string[] = Object.keys(body);
      const reqKeys: string[] = [
        "address",
        "auth",
        "use_sets",
        "use_zones",
        "sets",
      ];
      if (
        Web3Token.verify(body.auth.replace("Web3-Token ", "")) !== body.address
      ) {
        throw new Error("Invalid address");
      }
      if (!compareArrays(bodyKeys, reqKeys)) {
        throw new Error("Invalid body");
      }
      if (
        !(
          typeof body.use_sets === "boolean" &&
          typeof body.use_sets === "boolean"
        )
      ) {
        throw new Error("use_sets or use_zones is not boolean");
      }
      const sets = body.sets;
      const requiredSetKeys = ["item_ids", "zone", "repair_amount"];
      for (let i = 0; i < sets.length; i++) {
        const setKeys = Object.keys(sets[i]);
        if (!compareArrays(requiredSetKeys, setKeys)) {
          throw new Error("Invalid set");
        }
        const zone = parseInt(sets[i].zone);
        if (isNaN(zone)) {
          throw new Error("Invalid zone");
        }
        if (zone === 0 || zone > 1431 || zone < -1) {
          throw new Error("Invalid zone");
        }
        if (sets[i].item_ids.length < 5 || sets[i].item_ids.length > 9) {
          throw new Error("Not a valid set");
        }
        if (!(sets[i].repair_amount in ["25%", "50%", "100%"])) {
          throw new Error("Not valid repair amount");
        }
      }

      const settingsColl = await db.collection("ffsettings");

      settingsColl.updateOne(
        { address: body.address },
        {
          $set: {
            use_sets: body.use_sets,
            use_zones: body.use_zones,
            sets: sets,
          },
        }
      );
      await client.close();
      res.status(200).send({});
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server Error" });
  }
}
