from agents import OpenAIChatCompletionsModel, set_tracing_disabled
from dotenv import load_dotenv, find_dotenv
import os
from openai import AsyncOpenAI

load_dotenv(find_dotenv(), override=True)

api_key = os.getenv("API_KEY")
base_path = os.getenv("URL")
model_name = os.getenv("model")

set_tracing_disabled(True)

client = AsyncOpenAI(api_key=api_key, base_url=base_path)

model = OpenAIChatCompletionsModel(openai_client=client, model=str(model_name))
