import { Monitor } from "@opencode/schema/monitor"
import { Session } from "@opencode/schema/session"
import { Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "effect/unstable/httpapi"
import { SessionNotFoundError } from "../errors.js"

export const MonitorGroup = HttpApiGroup.make("server.monitor")
  .add(
    HttpApiEndpoint.get("monitor.list", "/api/session/:sessionID/monitor", {
      params: { sessionID: Session.ID },
      success: Schema.Array(Monitor.Info),
      error: SessionNotFoundError,
    }).annotateMerge(
      OpenApi.annotations({
        identifier: "monitor.list",
        summary: "List session monitors",
        description: "List running and ended background monitors, including monitors ended by a server restart.",
      }),
    ),
  )
  .annotateMerge(OpenApi.annotations({ title: "monitor", description: "Session background monitor routes." }))
