#!/usr/bin/env python3
"""
Claude Optimizer - Bootstrap Script
Initializes project directories and configuration files.
"""

import os
import json
from pathlib import Path

# Define project root (assumes this script is run from the project root)
ROOT_DIR = Path(__file__).parent.resolve()

# Define folders to create
FOLDERS = [
    ROOT_DIR / "src",
    ROOT_DIR / "data" / "samples",
    ROOT_DIR / "data" / "cache",
    ROOT_DIR / "output" / "sample_project" / "prompts",
    ROOT_DIR / "output" / "sample_project" / "responses",
    ROOT_DIR / "templates",
    ROOT_DIR / "config",
    ROOT_DIR / "integration" / "codex",
    ROOT_DIR / "integration" / "cli"
]

# Default config
CONFIG = {
    "general": {
        "default_model": "claude-3-opus",
        "output_dir": "output",
        "theme": "dark"
    },
    "optimization": {
        "target_reduction": 0.3,
        "aggressive_mode": False
    },
    "api": {
        "api_key_env_var": "ANTHROPIC_API_KEY",
        "api_endpoint": "https://api.anthropic.com/v1/messages"
    }
}

def create_directories():
    print("\n📁 Creating project directories...")
    for folder in FOLDERS:
        os.makedirs(folder, exist_ok=True)
        print(f"✅ {folder}")

def create_config():
    config_path = ROOT_DIR / "config" / "preferences.json"
    if not config_path.exists():
        print("\n📝 Creating default config...")
        with open(config_path, "w") as f:
            json.dump(CONFIG, f, indent=2)
        print(f"✅ Created {config_path}")
    else:
        print(f"✔️  Config already exists: {config_path}")

def confirm_success():
    print("\n🎉 Claude Optimizer bootstrap complete!")
    print("You can now run optimizer.sh or begin development.")

if __name__ == "__main__":
    create_directories()
    create_config()
    confirm_success()
