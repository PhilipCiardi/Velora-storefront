from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/frontend", StaticFiles(directory="../frontend"), name="frontend")


@app.get("/")
async def home():
    return FileResponse("../frontend/index.html")

@app.get("/dark")
async def dark():
    return FileResponse("../frontend/dark.html")


@app.get("/clean")
async def clean():
    return FileResponse("../frontend/clean.html")


@app.get("/warm")
async def warm():
    return FileResponse("../frontend/warm.html")