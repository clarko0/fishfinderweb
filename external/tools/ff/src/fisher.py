import exceptions
import json
import zones
import requests

WOD_ENPOINT = "https://api.worldofdefish.com"

def get_zones(limit : int, owned : list):
    zone = [zones.zone[i] for i in range(limit)]
    zone += [i for i in owned]
    z = json.loads(requests.post(WOD_ENPOINT + "/zones/select", json={
        "filters" : {
            "fee" : {
                "max" : 80,
                "min" : 0
            },
            "id" : zone,
        },
        "sort": {"sort_by": "tier", "sort_dir": "DESC"},
        "take": len(zone)
    }).text)
    zones = [
        {
            "id" : j["id"],
            "fee" : 0 if j["id"] in owned else j["fee"], 
            "wod_rate" : j["wod_rate"] * 3600, 
            "players" : j["fishing_pool"]["agents_amount"]
        } 
        for j in z["items"]
    ]
    return zones

def get_owned(auth: str):
    res = json.loads(requests.get(WOD_ENPOINT + "/users/my-zones", headers={"Authorization": auth}).text)
    return [i["id"] for i in res]

def calculate_limit(user_level: int, boat: int):
    level_mins = [1, 13, 30, 45, 54, 61]
    level_cap = len([i for i in level_mins if i < user_level])
    if boat is not None:
        if level_cap > 3:
            if boat["rarity"] in [1, 2]:
                level_cap = min(level_cap, 4)
            elif boat["rarity"] in [3, 4]:
                level_cap = min(level_cap, 5)
            else:
                level_cap = min(level_cap, 6)
    return level_cap



class Fisher:
    def __init__(self, address: str, auth: str, user_level : int) -> None:
        self.address = address
        self.auth = auth
        self.user_level = user_level
    
    def __str__(self) -> dict:
        return {
            "address" : self.address,
            "auth" : self.auth,
            "user_level" : self.user_level
        }

    def start_fishing(self, sets: list) -> list:
        for s in sets:
            item_ids = [int(s[i]["id"]) for i in s if s[i] != None]
            zones = get_zones(limit=calculate_limit(self.user_level, boat=s["boat"]), owned=get_owned())
            json.loads(requests.post(WOD_ENPOINT + f'/fishing/{zone}/start', headers={"Authorization" : self.auth}, json={"item_ids" : item_ids}))
