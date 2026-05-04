"""
nexus telemetry — fire events to nateisles.com so the dashboard sees what nexus is doing.

drop this file into nexus's working directory. import emit(). call it at:
  - pipeline start / step completion / pipeline end
  - bot interaction (after a successful response, after an error)
  - content package written
  - errors

zero deps. uses urllib only. fails silently — telemetry must never break the agent.

env vars expected on the vps (set in /etc/systemd/system/nexus-bot.service or shell profile):
  NEXUS_TELEMETRY_URL=https://nateisles.com/api/nexus/event
  NEXUS_SHARED_SECRET=<same value as on vercel>
"""

from __future__ import annotations

import json
import os
import time
import urllib.request
import urllib.error

_URL = os.environ.get("NEXUS_TELEMETRY_URL", "https://nateisles.com/api/nexus/event")
_SECRET = os.environ.get("NEXUS_SHARED_SECRET", "")
_TIMEOUT = 5  # seconds — never block the agent for telemetry


def emit(event_type: str, **fields) -> None:
    """
    fire-and-forget event to the dashboard. catches every exception.

    examples:
        emit("pipeline_step", step="briefing_generated",
             detail="2026-05-05_briefing.md — 4,821 bytes")
        emit("bot_interaction", detail="researched: AI video monetization Q4")
        emit("content_package", vertical="historical",
             detail="TheRevolutionisnow — Freedmens Bureau 1865")
        emit("error", step="run_collectors", detail="timeout on RSS feed")
    """
    if not _SECRET:
        return

    payload = {"type": event_type, "ts": int(time.time()), **fields}

    try:
        req = urllib.request.Request(
            _URL,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {_SECRET}",
                "User-Agent": "nexus/1.0",
            },
            method="POST",
        )
        urllib.request.urlopen(req, timeout=_TIMEOUT).read()
    except (urllib.error.URLError, urllib.error.HTTPError, OSError, Exception):
        # never propagate. the agent's job is more important than the dashboard.
        pass


# convenience wrappers — use whichever style fits the call site
def pipeline_start(detail: str = "weekly run") -> None:
    emit("pipeline_start", detail=detail)


def pipeline_step(step: str, detail: str = "") -> None:
    emit("pipeline_step", step=step, detail=detail)


def pipeline_end(detail: str = "ok") -> None:
    emit("pipeline_end", detail=detail)


def bot_interaction(detail: str) -> None:
    emit("bot_interaction", detail=detail)


def content_package(vertical: str, detail: str) -> None:
    emit("content_package", vertical=vertical, detail=detail)


def error(step: str, detail: str) -> None:
    emit("error", step=step, detail=detail)


if __name__ == "__main__":
    # quick smoke test — run this once after setting env vars to confirm wiring.
    print(f"target: {_URL}")
    print(f"secret set: {bool(_SECRET)}")
    emit("pipeline_start", detail="telemetry smoke test")
    print("sent. check https://nateisles.com/tools/nexus")
