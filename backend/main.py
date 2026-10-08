import os
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter
from fastapi.sse import EventSourceResponse
from langchain_openai import ChatOpenAI

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(parent_dir, '.env')
load_dotenv(dotenv_path)

openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
openrouter_url=os.getenv("OPENROUTER_URL")
openrouter_orchestrator_model=os.getenv("OPENROUTER_ORCHESTRATOR_MODEL")

app = FastAPI()
router = APIRouter(prefix="/api", tags=["api"])

llm = ChatOpenAI(
    model=openrouter_orchestrator_model,
    base_url=openrouter_url,
    api_key=openrouter_api_key,
    stream_usage=True
)


@router.get("/health")
def health():
    return {"health": "ok"}


@router.post("/chat")
def chat(prompt:str = "hello"):
    response = llm.invoke(prompt)
    
    return response

@router.post("/chat_stream",response_class=EventSourceResponse)
def chat_stream(prompt:str = "hello"):
    for chunk in llm.stream(prompt):
        yield chunk


# curl -X POST http://localhost:8000/api/chat \
#      -H "Content-Type: application/json" \
#      -d '{"prompt": "who are you?"}'

app.include_router(router)