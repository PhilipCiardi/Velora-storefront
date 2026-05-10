from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/frontend", StaticFiles(directory="../frontend"), name="frontend")


@app.get("/")
async def home():
    return FileResponse("../frontend/index.html")


@app.get("/shop")
async def shop():
    return FileResponse("../frontend/shop.html")


@app.get("/trending")
async def trending():
    return FileResponse("../frontend/trending.html")


@app.get("/contact")
async def contact():
    return FileResponse("../frontend/contact.html")


@app.get("/cart")
async def cart():
    return FileResponse("../frontend/cart.html")