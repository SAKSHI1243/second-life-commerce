import json
import os
from typing import List, Dict

# Define file paths for our lightweight local database
PRODUCTS_DB = "products.json"
SELLERS_DB = "sellers.json"

def initialize_db():
    """
    Bootstraps the JSON files if they don't exist yet.
    This prevents FileNotFoundError on first startup.
    """
    if not os.path.exists(PRODUCTS_DB):
        with open(PRODUCTS_DB, "w") as f:
            json.dump([], f)  # Initialize products as an empty list

    if not os.path.exists(SELLERS_DB):
        with open(SELLERS_DB, "w") as f:
            # Initialize with dummy user accounts for the demo
            default_sellers = {
                "user_rahul": {"green_points": 0, "listings_count": 0},
                "user_sakshi": {"green_points": 500, "listings_count": 2}
            }
            json.dump(default_sellers, f, indent=4)

def read_json(file_path: str):
    """Safely reads data from a specified JSON file."""
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return [] if file_path == PRODUCTS_DB else {}

def write_json(file_path: str, data):
    """Safely writes structured data back to the JSON file with clean indentation."""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

# Automatically trigger DB bootstrap when this file is imported or run
initialize_db()