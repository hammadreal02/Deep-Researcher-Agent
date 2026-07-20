import os
from agents import Agent, function_tool
from dotenv import load_dotenv, find_dotenv
from tavily import TavilyClient

load_dotenv(find_dotenv(), override=True)

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@function_tool
async def search_web(query: str) -> str:
    """Search the web for information on a given topic using Tavily API.

    Args:
        query: The search query string

    Returns:
        A formatted string with search results including titles, URLs, and summaries
    """
    try:
        response = tavily_client.search(query=query, search_depth="advanced", max_results=5)

        if not response or "results" not in response:
            return "No results found."

        formatted = []
        for i, result in enumerate(response["results"], 1):
            title = result.get("title", "No title")
            url = result.get("url", "No URL")
            content = result.get("content", "No content")
            formatted.append(f"{i}. **{title}**\n   URL: {url}\n   Summary: {content[:500]}")

        return "\n\n".join(formatted)

    except Exception as e:
        return f"Search error: {str(e)}"

researcher = Agent(
    name="researcher",
    instructions="""You are a web research specialist.

Your role is to search for information on given topics using the search_web tool.

For each search query:
1. Call search_web with the exact query
2. Summarize the key findings from each source
3. Note the source URLs for citation

Be thorough and gather diverse perspectives on each topic.
""",
    tools=[search_web],
)
