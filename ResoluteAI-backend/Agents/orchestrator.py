from agents import Agent
from Agents.planner import planner
from Agents.researcher import researcher
from Agents.analyzer import analyzer
from Agents.reporter import reporter

orchestrator = Agent(
    name="orchestrator",
    instructions="""You are the coordinator of a deep research pipeline.

Your workflow:
1. **Plan** — Hand off to the planner agent to create a research plan
2. **Research** — For each sub-topic in the plan, hand off to the researcher agent to gather information
3. **Analyze** — Hand off all gathered research to the analyzer agent for synthesis
4. **Report** — Hand off the analysis to the reporter agent to generate the final report

Guide the user through each stage. At the end, present the complete report.

Always use the specialist agents for their respective tasks — do not skip steps.
""",
    handoffs=[planner, researcher, analyzer, reporter],
)
