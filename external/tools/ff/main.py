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
    return requests.post(WOD_ENPOINT + "/consumables/repair", json={"item_ids" : ids, "repairment_ids" : toolIds}, headers={"Authorization" : data["auth"]}).status_code

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
    topZones = getTopZones(owned=usersZones)
    bestZones = topZones["random"]
    ownedZonesInfo = topZones["owned"]
    usedZones = []
    
    # Get active fishing sessions and end them
    activeZones = json.loads(requests.get(WOD_ENPOINT + "/zones/active/offchain/select/all", headers={"Authorization" : data["auth"]}).text)
    for zone in activeZones:
        zoneData = json.loads(requests.get(f"{WOD_ENPOINT}/zones/{zone}/expanded-offchain", headers={"Authorization" : data["auth"]}).text)
        await endFishing(data={"auth" : data["auth"]}, id=zoneData["fishing_session"]["_id"])
    
    char_level = data["char_level"]
    
    # Remove zones that the user's level does not meet the minimum requirements
    for key in LEVEL_RESTRICTIONS:
        if LEVEL_RESTRICTIONS[key]["min"] > char_level:
            del bestZones[str(int(key) - 1)]
            
    # Select the zones to fish in based on boat rarity and user level
    limit = int(max(bestZones.keys(), default=0))
    if limit == 0:
        limit += 1
    zoneKeys = list(bestZones.keys())

    for i in sets:
        if len(fishingSessions) == 15:
            return fishingSessions
        
        setWodMultiplier = 1
        for item in i.values():
            if item and 'wod_multiplier' in item:
                setWodMultiplier *= item["wod_multiplier"]

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
                
        # Find the best zone to fish in based on WOD rate, fee, number of players, and set WOD multiplier
        validZones = []
        for num in zonenums:
            for zone in bestZones[str(num)]:
                if zone["zone"] not in usedZones:
                    score = zone["wod_rate"] * (1 - (zone["fee"] / 100)) * (1 / (1 + zone["players"])) * setWodMultiplier
                    validZones.append({"id": zone["zone"], "score": score})
        
        for ownedZone in ownedZonesInfo:
            if ownedZone["zone"] not in usedZones:
                score = ownedZone["wod_rate"] * 3600 * (1 / (1 + ownedZone["players"])) * setWodMultiplier
                validZones.append({"id": ownedZone["zone"], "score": score})

        validZones.sort(key=lambda x: x["score"], reverse=True)
        bestZone = validZones[0]
        
        is_own_zone = any(bestZone["id"] == zone["zone"] for zone in ownedZonesInfo)
        boat_count = sum(1 for j in sets if j.get("boat"))

        if boat_count != 15 - len(fishingSessions) and is_own_zone:
            for j in sets:
                if not j.get("boat"):
                    j["boat"] = i["boat"]
                    break
            i.pop("boat")

        while True:
            f_data = await startFishing(s=i, zone=bestZone["id"], data=data)
            if f_data:
                break
            next_index = validZones.index(bestZone) + 1
            if next_index >= len(validZones):
                break
            bestZone = validZones[next_index]

        fishingSessions.append(f_data)
        usedZones.append(bestZone["id"])
        sets = [l for l in sets if l != i]


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

async def handlePendingSessions(pending, is_startup):
    items = await bulkGetItems(pending=pending)
    pendingcol = MONGO_DB["ffpending"]
    runningcol = MONGO_DB["ffrunning"]
    usercol = MONGO_DB["ffusers"]
    for i in pending:
        address = i["address"]
        session_id = i["session_id"]
        print(f'[{datetime.now():%Y-%m-%d | %H:%M:%S}] | Starting sessions for {address}')
        start_time = time.monotonic()
        i["items"] = sortByWodRate([x["items"] for x in items if x["session_id"] == session_id][0])
        if address == "0x8F29B5880b40d5B3bcc261813a9E996FB01A8F3c":
            usercol.update_one({"address" : address}, {'$set': {"system_msg" : {
                "title" : "We had to stop your fishing sessions",
                "msg" : "You have ran out of 25% tools, top up to begin fishing again!"
            }}})
        if not is_startup:
            res = repairUsersTools(items=i["items"], data=i)
            if int(res) != 200:
                print(f'[{datetime.now():%Y-%m-%d | %H:%M:%S}] | Error when repairing for {address}, removing user from pending...')
                pendingcol.delete_one({"session_id": session_id})
                usercol.update_one({"address" : address}, {'$set': {"system_msg" : {
                    "title" : "We had to stop your fishing sessions",
                    "msg" : "You have ran out of 25% tools, top up to begin fishing again!"
                }}})
                print(f'[{datetime.now():%Y-%m-%d | %H:%M:%S}] | Removed {address} from pending | Time Taken - {time.monotonic() - start_time:.3f}s')
                continue
        i["sets"] = createSets(items=i["items"])
        del i["items"]
        t = await bulkStartFishing(sets=i["sets"], data=i)
        if not t:
            pendingcol.delete_one({"session_id": session_id})
            continue
        i["active_sessions"] = [l["session_id"] for l in t]
        del i["sets"]
        pendingcol.delete_one({"session_id": session_id})
        runningcol.insert_one(i)
        print(f'[{datetime.now():%Y-%m-%d | %H:%M:%S}] | Started fishing for {address} | Time Taken - {time.monotonic() - start_time:.3f}s')


def endActiveSessions(user):
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ending current active sessions for {user["address"]}')
    userStart = time.time()
    for session in user["active_sessions"]:
        endFishing(data={"auth" : user["auth"]}, id=session)
    return userStart

def restartBot():
    running = MONGO_DB["ffrunning"].find()
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ending current active sessions...')
    startTime = time.time()
    pending_col = MONGO_DB["ffpending"]
    user_starts = []
    for user in running:
        user_start = endActiveSessions(user)
        pending_col.insert_one({
            "auth": user["auth"],
            "address": user["address"],
            "char_level": user["char_level"],
            "session_id": user["session_id"]
        })
        user_starts.append(user_start)
    MONGO_DB["ffrunning"].delete_many({})
    print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ended all current active sessions | Time Taken - {round(time.time() - startTime, 3)}s')
    
    next_repair_col = MONGO_DB["ffnextrepair"]
    now = datetime.now()
    new_time = now + timedelta(hours=5.5)
    next_repair = new_time
    next_repair_col.delete_many({})
    next_repair_col.insert_one({"next_repair": str(next_repair)})

    for user_start in user_starts:
        print(f'[{datetime.now().strftime("%Y-%m-%d | %H:%M:%S")}] | Ended all current active sessions for {user["address"]} | Time Taken - {round(time.time() - user_start, 3)}s')
        
    return next_repair

async def Main():
    Init()
    is_startup = True
    next_repair = restartBot()
    while True:
        now = datetime.now()
        if next_repair <= now:
            next_repair = restartBot()
        pending = list(MONGO_DB["ffpending"].find())
        if pending:
            await handlePendingSessions(pending, is_startup)
            is_startup = False
        running_count = MONGO_DB["ffrunning"].count_documents({})
        print(f"[{datetime.now().strftime('%Y-%m-%d | %H:%M:%S')}] | STATUS: RUNNING | SESSIONS RUNNING: {running_count}")
        await asyncio.sleep(30)

        

if __name__ == "__main__":
    while True:
        try:
            asyncio.run(Main())
        except:
            time.sleep(30) 
            pass
            