from fastapi import FastAPI
from routes.predict import router

app = FastAPI()

app.include_router(router)


@app.get("/")
def root():
    return {"status": "FluxLane backend running"}


@app.head("/")
def root_head():
    return {"status": "ok"}