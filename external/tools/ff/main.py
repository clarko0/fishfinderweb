import json
import aiohttp
from src import zones
import asyncio
import time
from datetime import datetime, timedelta
import requests
import pymongo


WOD_ENPOINT = "https://api.worldofdefish.com"

# print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Starting init...' )
# startTime = time.time()
# print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | init Finished | Time Taken - {round(time.time() - startTime, 3)}s' )


def Init():
    global LEVEL_RESTRICTIONS
    global BOAT_TIER_ALLOWANCE
    global MONGO_CLIENT
    global MONGO_DB
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Starting init...' )
    startTime = time.time()
    LEVEL_RESTRICTIONS = json.loads(requests.get(WOD_ENPOINT + "/settings/fs-level-restricts").text)
    BOAT_TIER_ALLOWANCE = json.loads(requests.get(WOD_ENPOINT + "/settings/boat-tier-allowance").text)
    MONGO_CLIENT = pymongo.MongoClient("mongodb+srv://vercel-admin-user:Ht876eTX50pKNu6q@fishfinder.y5j4gkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    MONGO_DB = MONGO_CLIENT["FishFinder"]
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | init Finished | Time Taken - {round(time.time() - startTime, 3)}s' )

def calculateScore(x, y):
    x += 1
    y = y / 100

    return (1 / x) * (1 - y)


async def getUserItems(session, data):
    returnObject = {
        "session_id" : data["session_id"]
    }
    response = await session.get(WOD_ENPOINT + "/users/my-items", headers={"Authorization" : data["auth"]})
    json_response = await response.json()
    items = {
        "rod" : [],
        "hook" : [],
        "reel" : [],
        "bite-indicator" : [],
        "line" : [],
        "float": [],
        "fish-feeders-box" : [],
        "boat" : [],
        "net" : []
    }
    for i in json_response:
        if i["is_teleported"]:
            try:
                items[i["slot_key"]].append({
                    "name" : i["name"],
                    "slot_key" : i["slot_key"],
                    "rarity" : i["rarity"],
                    "id" : i["_id"],
                    "image" : i["rendered_image"],
                    "level" : i["level"],
                    "durability" : i["durability"],
                    "wod_multiplier" : i["wod_multiplier"],
                    "exp_multiplier" : i["exp_multiplier"],
                    "drop_multipliers" : i["drop_multipliers"], 
                    "tool_id" : determineRepair(str(i["rarity"])),
                    "owner" : i["owner"]
                })
            except:
                pass
    returnObject["items"] = items
    return returnObject


def determineRepair(rarity):
    choice = {
        "1" : 0,
        "2" : 3,
        "3" : 6,
        "4" : 9,
        "5" : 12,
        "6" : 15
    }
    return choice[rarity]


def repairUsersTools(data, items):
    ids = []
    toolIds = []
    for key in items:
        for i in items[key]:
            ids.append(i["id"])
            toolIds.append(i["tool_id"])
    response = requests.post(WOD_ENPOINT + "/consumables/repair", json={"item_ids" : ids, "repairment_ids" : toolIds}, headers={"Authorization" : data["auth"]})

def getTopZones(owned):
    chunks = []
    sortedZones = []
    for Zone in zones.zone:
        z = json.loads(requests.post(WOD_ENPOINT + "/zones/select", json={
            "filters" : {
                "fee" : {
                    "max" : 80,
                    "min" : 0
                },
                "id" : Zone,
            },
            "sort": {"sort_by": "tier", "sort_dir": "DESC"},
            "take": len(Zone)
        }).text)
        chunks.append(z["items"])
    for chunk in chunks:
        tier = []
        for zone in chunk:
            number = zone["id"]
            fee = zone["fee"]
            wod_rate = zone["wod_rate"] * 3600
            players = zone["fishing_pool"]["agents_amount"]
            obj = {
                "zone" : number,
                "score" : calculateScore(players, fee),
                "fee" : fee,
                "players" : players,
                "wod_rate" : wod_rate
            }
            tier.append(obj)
        tier = sorted(tier, key=lambda x: x["score"], reverse=True)
        sortedZones.append(tier)
    ownedZonesInfo = []
    for tier in sortedZones:
        for zone in tier:
            if zone["zone"] in owned:
                ownedZonesInfo.append(zone)
    return {"random" : {
        "0" : sortedZones[0][:25],
        "1" : sortedZones[1][:25],
        "2" : sortedZones[2][:25],
        "3" : sortedZones[3][:25],
        "4" : sortedZones[4][:25],
        "5" : sortedZones[5][:25]
        },
        "owned" : ownedZonesInfo
    }


def getUsersZone(data):
    res = json.loads(requests.get(WOD_ENPOINT + "/users/my-zones", headers={"Authorization": data["auth"]}).text)
    return [i["id"] for i in res if i["tier"] > 3]

async def bulkGetItems(pending):
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Fetching pending items...' )
    startTime = time.time()
    tasks = []
    async with aiohttp.ClientSession() as session:
        for i in pending:
            tasks.append(getUserItems(session=session, data=i))
        results = await asyncio.gather(*tasks)
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Fetched pending items | Time Taken - {round(time.time() - startTime, 3)}s' )
    return results


def createSets(items):
    required = ["rod", "hook", "line", "float", "reel"]
    sets = []
    i = 0
    blacklist = []
    while True:
        newSet = {
        "rod" : None,
        "hook" : None,
        "line" : None,
        "float" : None,
        "reel" : None,
        "boat" : None,
        "fish-feeders-box" : None,
        "net" : None,
        "bite-indicator" : None
    }
        for key in newSet:
            if key in blacklist:
                pass
            else:
                try:
                    newSet[key] = items[key][i]
                except:
                    blacklist.append(key)
                    pass
        i += 1
        sets.append(newSet)
        if len(sets) == 15:
            break
        # Check for sets with 'None' values under the keys in 'required'
    sets_with_none = []
    for set in sets:
        if any([set[key] is None for key in required]):
            sets_with_none.append(set)
    
    # Remove sets with 'None' values under the keys in 'required'
    for set_with_none in sets_with_none:
        sets.remove(set_with_none)

    return sets




    
    

def sortByWodRate(items):
    for key in items:
        items[key] = sorted(items[key], key=lambda x: x["wod_multiplier"], reverse=True)
    return items


# "score": (z["wod_rate"] * 3600) * (1 - (z["fee"] / 100)) * (1 / (1 + z["fishing_pool"])) * setWodMultiplier
async def bulkStartFishing(sets, data):
    fishingSessions = []
    usersZones = getUsersZone(data=data)
    res = getTopZones(owned=usersZones)
    bestZones = res["random"]
    ownedZonesInfo = res["owned"]
    usedZones = json.loads(requests.get("https://api.worldofdefish.com/zones/active/offchain/select/all", headers={"Authorization" : data["auth"]}).text)
    if len(usedZones) != 0:
        for i in usedZones:
            zoneData = json.loads(requests.get(f"https://api.worldofdefish.com/zones/{i}/expanded-offchain", headers={"Authorization" : data["auth"]}).text)
            
            fishingSessions.append(
                {"session_id" : zoneData["fishing_session"]["_id"],
                "zone_id" : zoneData["_id"],
                "fee" : zoneData["fee"],
                "wod_multiplier" : zoneData["fishing_session"]["wod_multiplier"],
                "set" : []}
                )
    print(fishingSessions)
    char_level = data["char_level"]
    

    for key in LEVEL_RESTRICTIONS:
        if LEVEL_RESTRICTIONS[key]["min"] > char_level:
            del bestZones[str(int(key) - 1)]
    zoneKeys = list(bestZones.keys())
    limit = int(zoneKeys[-1])
    if(limit == 0):
        limit += 1

    for i in sets:
        if(len(fishingSessions) == 15):
            return fishingSessions
        validZones = []
        setWodMultiplier = 1
        for key in i:
            if i[key] is not None and 'wod_multiplier' in i[key]:
                setWodMultiplier *= i[key]["wod_multiplier"]

        boat = i.get("boat")
        if not boat:
            zonenums = list(range(min(3, limit)))
        else:
            boatRarity = boat["rarity"]
            if boatRarity in [1, 2]:
                zonenums = list(range(min(4, limit)))
            elif boatRarity in [3, 4]:
                zonenums = list(range(min(5, limit)))
            else:
                zonenums = list(range(min(6, limit)))

        tempZones = {str(num): bestZones[str(num)] for num in zonenums}
        for key, zones in tempZones.items():
            for z in zones:
                if z["zone"] not in usedZones:
                    score = z["wod_rate"] * (1 - (z["fee"] / 100)) * (1 / (1 + z["players"])) * setWodMultiplier
                    validZones.append({"id": z["zone"], "score": score})
        for z in ownedZonesInfo:
            if z["zone"] not in usedZones:
                score = z["wod_rate"] * 3600 * (1 / (1 + z["players"])) * setWodMultiplier
                validZones.append({"id": z["zone"], "score": score})

        validZones.sort(key=lambda x: x["score"], reverse=True)
        bestZone = validZones[0]
        fData = await startFishing(s=i, zone=bestZone["id"], data=data)
        while fData == {}:
            bestZone = validZones[validZones.index(bestZone) + 1]
            fData = await startFishing(s=i, zone=bestZone["id"], data=data)
        fishingSessions.append(fData)
        usedZones.append(bestZone["id"])

    return fishingSessions

            


async def startFishing(s, zone, data):
    try:
        res = requests.post(WOD_ENPOINT + f'/fishing/{zone}/start', headers={
            "Authorization" : data["auth"]
        },
        json = {
            "item_ids" : [int(s[i]["id"]) for i in s if s[i] != None]
        }
        ).text
        res_json = json.loads(res)
        print(res_json)
        try:
            return {
                "session_id" : res_json["_id"],
                "zone_id" : res_json["zone"],
                "fee" : res_json["fixed_fee"],
                "wod_multiplier" : res_json["wod_multiplier"],
                "set" : s
            }
        except:
            return {}
    except:
        print("ERROR", res)
        print(zone)
        print(data)
        return False

def endFishing(data, id):
    response = requests.post(WOD_ENPOINT + f"/fishing/{id}/end", headers={"Authorization" : data["auth"]})

def handlePendingSessions(pending, isStartup):
    items = asyncio.run(bulkGetItems(pending=pending))
    for i in pending:
        invalid = True
        print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Starting sessions for {i["address"]}' )
        startTime = time.time()
        i["items"] = sortByWodRate([x["items"] for x in items if x["session_id"] == i["session_id"]][0])
        # if not isStartup:
        repairUsersTools(items=i["items"], data=i)
        i["sets"] = createSets(items=i["items"])
        i.pop("items")
        # if (len(i["sets"]) == 0):
        #     print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Error could not find any sets for {i["address"]}, removing user from pending...' )
        #     pendingcol = MONGO_DB["ffpending"]
        #     pendingcol.delete_one({ "session_id" : i["session_id"] })
        #     print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Removed {i["address"]} from pending | Time Taken - {round(time.time() - startTime, 3)}s' )
        #     pass
        # else:
        t = asyncio.run(bulkStartFishing(sets=i["sets"], data=i))
        print(len(t))
        if(len(t) == 0):
            pendingcol = MONGO_DB["ffpending"]
            pendingcol.delete_one({ "session_id" : i["session_id"] })
        for l in t:
            if not l:
                # pendingcol = MONGO_DB["ffpending"]
                # pendingcol.delete_one({ "session_id" : i["session_id"] })
                invalid = False
                break
            if l["session_id"] == "pass":
                t.pop(l)
        if invalid:
            i["active_sessions"] = [l["session_id"] for l in t]
            i.pop("sets")
            pendingcol = MONGO_DB["ffpending"]
            pendingcol.delete_one({ "session_id" : i["session_id"] })
            runningcol = MONGO_DB["ffrunning"]
            runningcol.insert_one(i)
            print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Started fishing for {i["address"]} | Time Taken - {round(time.time() - startTime, 3)}s' )
        else:
            pass
def restartBot():
    running = MONGO_DB["ffrunning"].find()
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ending current active sessions...' )
    startTime = time.time()
    pending = MONGO_DB["ffpending"]
    for user in running:
        print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ending current active sessions for {user["address"]}' )
        userStart = time.time()
        for session in user["active_sessions"]:
            endFishing(data={"auth" : user["auth"]}, id=session)
        pending.insert_one({"auth" : user["auth"], "address" : user["address"], "char_level" : user["char_level"], "session_id" : user["session_id"]})
        print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ended all current active sessions for {user["address"]} | Time Taken - {round(time.time() - userStart, 3)}s' )
    MONGO_DB["ffrunning"].delete_many({})
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ended all current active sessions | Time Taken - {round(time.time() - startTime, 3)}s' )
    next_repair_col = MONGO_DB["ffnextrepair"]
    now = now = datetime.now()
    new_time = now + timedelta(hours=5.5)
    next_repair = new_time
    next_repair_col.delete_many({})
    next_repair_col.insert_one({"next_repair" : str(next_repair)})
    return next_repair

def Main():
    next_repair = ""
    Init()
    isStartup = True
    next_repair = restartBot()
    while True:
        now = datetime.now()
        if next_repair <= now:
            next_repair = restartBot()
        pending = MONGO_DB["ffpending"].find()
        pending_list = [i for i in pending]
        if any(pending_list):
            handlePendingSessions(pending_list, isStartup)
            isStartup = False
        print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | STATUS : RUNNING | SESSIONS RUNNING : {len(list(MONGO_DB["ffrunning"].find()))}')
        time.sleep(30)
        

if __name__ == "__main__":
    while True:
        try:
            Main()
        except:
            time.sleep(30) 
            pass
            