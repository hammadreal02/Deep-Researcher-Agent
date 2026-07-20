import json
import asyncio
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

router = APIRouter()

class ResearchRequest(BaseModel):
    query: str

async def research_generator(query: str):
    try:
        from agents import Runner
        from Agents.orchestrator import orchestrator
        from Configration.config import model

        orchestrator.model = model

        yield {
            "event": "stage",
            "data": json.dumps({"stage": "plan", "content": "Analyzing your query and creating research plan..."})
        }

        await asyncio.sleep(0.5)

        result = await Runner.run(orchestrator, query)

        yield {
            "event": "complete",
            "data": json.dumps({"report": result.final_output})
        }

    except Exception as e:
        yield {
            "event": "error",
            "data": json.dumps({"message": str(e)})
        }

@router.post("/api/research")
async def start_research(request: ResearchRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    return EventSourceResponse(research_generator(request.query))
