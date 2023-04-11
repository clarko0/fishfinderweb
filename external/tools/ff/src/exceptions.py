class BrokenItem(Exception):
    "Item durability is 0"
    pass

class SetMissingItem(Exception):
    "Set is missing an item"
    pass