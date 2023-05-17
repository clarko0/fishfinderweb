await(async () => {
  let address = $app.$store.getters["web3/acc"];
  return {
    address: $app.$store.getters["web3/acc"],
    token: $app.$store.getters["user/token"],
    userdata: (await $cfg.api.get("/auth/me")).data,
    tools: (await $cfg.api.get("/consumables/repairments/user/" + address))
      .data,
    zones: (await $cfg.api.get("/users/my-zones")).data,
    items: await (async () => {
      const mutation = `query {
         items_of_authed(
           sort: {},
           pagination: {},
         ) {
           id
           name
           description
           durability
           experience
           level
           drop_multipliers {
             common
             uncommon
             rare
             epic
             legendary
             artifact
           }
           createdAt
           updatedAt
           is_teleported
           pic_url
           pic
           rendered_image_url
           rendered_image
           wod_multiplier
           exp_multiplier
           base_wod_multiplier
           base_exp_multiplier
           slot_key
           rarity
           coll
           owner
           params
           essense
           metadata
           material_needed_for_upgrade {
             pic_url
             name
             id
          }
         }
       }`;

      const { data } = await $cfg.dapi.post("/graphql", {
        query: mutation,
      });

      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].message);
      }

      return data.data.items_of_authed.map((item) => {
        item._id = item.id;
        return item;
      });
    })(),
  };
})();
