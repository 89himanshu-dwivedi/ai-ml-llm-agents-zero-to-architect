# Claude AI: Zero to Architect - Markdown edition

Plain-Markdown copies of every lesson, generated from the HTML course so you can read
everything directly on GitHub. Diagrams are rendered as Mermaid, which GitHub displays inline.

- **Animated version:** [the HTML course](../index.html) (flow animations, play buttons)
- **Overview:** [index.md](index.md) &nbsp;&nbsp;|&nbsp;&nbsp; **Official catalog map:** [academy-map.md](academy-map.md)

## Modules

| # | Module | What it covers |
| --- | --- | --- |
| 01 | [Claude models & the Messages API](lessons/01-models-and-api.md) | The foundation module. By the end you can pick the right model on purpose, build a correct request by hand, read every field of the response, stream it, survive the error codes, and predict the bill. |
| 02 | [The Claude ecosystem](lessons/02-claude-ecosystem.md) | Same model, many doors. Chat, Claude Code, Cowork, the desktop app, browser and workspace extensions, and the raw API each solve a different job. Pick the wrong door and the work takes three times longer. |
| 03 | [Claude Code fundamentals](lessons/03-claude-code-fundamentals.md) | The agentic loop that runs underneath everything, how to install it on any OS, how to wire it into your IDE, and how to drive a session without wasting half your context on the first prompt. |
| 04 | [CLAUDE.md and context engineering](lessons/04-claude-md-context.md) | The difference between an agent that guesses your conventions every session and one that already knows them is a single file - plus the discipline to keep the context window clean. |
| 05 | [Modes, permissions, tools and hooks](lessons/05-modes-permissions-tools.md) | This is the module that decides whether an agent is useful or dangerous. Everything here is about controlling what it may do, proving what it did, and keeping a human at the points that matter. |
| 06 | [Sub-agents](lessons/06-subagents.md) | A sub-agent is a separate Claude instance with its own context window, its own tool set, and one job. It does the noisy work and hands back a summary - so your main conversation stays clean. |
| 07 | [Agent views](lessons/07-agent-views.md) | Four terminals, four half-finished tasks, and you cannot remember which one is waiting on you. Agent views turn that mess into one dashboard: what is running, what needs you, what is done. |
| 08 | [Agent teams](lessons/08-agent-teams.md) | Sub-agents are fire and forget: spawn, run once, return, vanish. Agent teams are persistent teammates that stay alive across turns, share a task list, and message each other mid-task. |
| 09 | [Skills](lessons/09-skills.md) | A skill is a reusable, versioned folder of instructions, resources and examples that teaches Claude how to do a specific kind of task - loaded only when that task actually comes up. |
| 10 | [Plugins, marketplaces and MCP](lessons/10-plugins-mcp.md) | Skills teach Claude a procedure. Plugins and MCP servers give it capability - live documentation, deep search, your ticketing system, your database. This is where the agent stops guessing and starts knowing. |
| 11 | [Cowork, Projects and Artifacts](lessons/11-cowork-projects-artifacts.md) | The same agentic loop, pointed at documents instead of source code. This is the module for the invoices, spreadsheets, reports and reviews that eat a manager's month - and it needs no programming at all. |
| 12 | [Evals, cost, safety & architecture](lessons/12-evals-cost-architecture.md) | The module that decides whether anything you built in modules 01 to 11 is allowed near production - and the interview bank that proves you can defend it. |
| 13 | [AI Fluency: the 4D framework](lessons/13-ai-fluency-4d.md) | Delegation, Description, Discernment, Diligence. Four competencies that survive every model release, because they describe what *you* do - not which button the vendor shipped this quarter. |
| 14 | [Capabilities and limitations](lessons/14-ai-capabilities-limits.md) | Four properties explain almost every surprising thing a model does. Learn them and "why did it do that?" becomes a diagnosis instead of a shrug. |
| 15 | [Claude 101 in practice](lessons/15-claude-101-everyday.md) | The everyday layer: how to have a first conversation that is actually useful, which of the three shapes of work a task calls for, and the features that turn ad-hoc chatting into a repeatable working system. |
| 16 | [Prompt engineering that holds](lessons/16-prompt-engineering.md) | Not tricks. Structure, examples, constraints and an eval loop - the things that keep working when the model changes and when a real user types something you did not anticipate. |
| 17 | [The Claude Platform](lessons/17-platform-console-agent-loop.md) | The gap between chatting in a browser tab and shipping something is not prompting - it is the loop, the tools, the context budget and the spend controls. This module closes it. |
| 18 | [Tool use, RAG and agentic search](lessons/18-tool-use-rag.md) | Two ways to give a model knowledge it does not have: let it call your systems, or retrieve the right passage before it answers. Production systems use both, and the failure modes are different. |
| 19 | [Agents and workflows](lessons/19-agents-workflows.md) | Six patterns cover almost every system you will build. Choosing the simplest one that works is the actual skill - most "agent" projects should have been a workflow. |
| 20 | [MCP: advanced topics](lessons/20-mcp-advanced.md) | Module 10 connected a server. This one is the protocol itself - the features that make a server genuinely useful, and the transport decisions that decide whether it scales. |
| 21 | [The AI-native SDLC](lessons/21-ai-native-sdlc.md) | Code generation got ten times faster. Planning, review, testing and deployment did not. This module is about the processes around the code - which is where the gains are now won or lost. |
| 22 | [Enterprise rollout](lessons/22-enterprise-rollout.md) | Five decisions determine whether Claude becomes infrastructure at your company or a pile of individual subscriptions nobody governs. They depend on each other, so the order matters. |
| 23 | [Claude on Bedrock and Vertex AI](lessons/23-bedrock-vertex.md) | Same models, three front doors. The difference is not capability - it is procurement, identity, data residency and which team already owns the bill. |
| 24 | [Claude Code for Salesforce, in VS Code](lessons/24-salesforce-claude-code.md) | Salesforce is close to the ideal agentic codebase: enormous metadata, strict runtime limits, a real test requirement and a deployment that can hurt. All four are things an agent can be held to - if you set it up properly. |
| 25 | [Salesforce agents, teams and skills](lessons/25-salesforce-agents-skills.md) | Module 24 wired the tooling up. This one is the payload: exploring an org you inherited, reviewers that know governor limits, a team that ships a release, and skills you invoke from the VS Code terminal. |

---

Written by Himanshu Kumar. Regenerate with `python scripts/claude_html_to_md.py`.
