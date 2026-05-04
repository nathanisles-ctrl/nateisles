# nexus telemetry

Fires events from Nexus → nateisles.com so the live dashboard at
[/tools/nexus](https://nateisles.com/tools/nexus) shows what he's doing.

## one-time setup (vercel side)

You'll need an Upstash Redis database (free tier, no card). Go to
https://upstash.com → create database → copy the REST URL and REST token.

Then in Vercel project → Settings → Environment Variables, add three:

| Name | Value |
|---|---|
| `UPSTASH_REDIS_REST_URL` | from Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | from Upstash dashboard |
| `NEXUS_SHARED_SECRET` | a random string you generate — `openssl rand -hex 32` |

Hit "Save" on each. Vercel auto-redeploys.

## one-time setup (vps side)

Drop `telemetry.py` into Nexus's working directory.

In `/etc/systemd/system/nexus-bot.service` (and the cron environment),
add the matching env vars:

```ini
[Service]
Environment="NEXUS_TELEMETRY_URL=https://nateisles.com/api/nexus/event"
Environment="NEXUS_SHARED_SECRET=<same value you put in Vercel>"
```

Reload + restart:

```bash
sudo systemctl daemon-reload
sudo systemctl restart nexus-bot.service
```

## use it from nexus

```python
from telemetry import emit, pipeline_step, content_package, error

# at pipeline start
emit("pipeline_start", detail="weekly run")

# at each step
pipeline_step("collectors_done", "12 sources, 84 signals")
pipeline_step("briefing_generated", "2026-05-05_briefing.md — 4,821 bytes")
pipeline_step("telegram_delivered", "5 messages sent")

# per content package
content_package("historical", "TheRevolutionisnow — Freedmens Bureau 1865")

# on bot interactions
emit("bot_interaction", detail="researched: AI video monetization Q4 2025")

# on errors
error("run_collectors", "timeout on RSS feed")

# at pipeline end
emit("pipeline_end", detail="ok")
```

`emit()` is fire-and-forget. It never raises and never blocks longer than
5 seconds. If the dashboard is down or the secret is wrong, the agent
keeps running.

## smoke test

```bash
python telemetry.py
```

Then refresh https://nateisles.com/tools/nexus — you should see a
`PIPELINE START · telemetry smoke test` event near the top of the feed.

## what the dashboard sees

The dashboard polls `/api/nexus/events` every 5 seconds. It shows:
- A health pill (ACTIVE / IDLE / QUIET / STANDBY) based on how recent
  the last event is
- The single most recent event in a "LAST HEARD" line
- A scrollable feed of the last 100 events

Events older than a week age out of the list (Redis trim, no manual cleanup).
