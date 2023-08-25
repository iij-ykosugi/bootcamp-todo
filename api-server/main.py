from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoItemInput(BaseModel):
    text: str


class TodoItem(BaseModel):
    id: int
    text: str
    done: bool


todo_items = {
    0: TodoItem(id=0, text='全てを忘れて眠る', done=False),
    1: TodoItem(id=1, text='旅立ちの支度をする', done=False)
}


latest_id = 1


def generate_id():
    global latest_id
    latest_id = latest_id + 1
    return latest_id


@app.get("/todo")
def query_todo_items(keyword: str = "", include_done: bool = False):
    def match(item: TodoItem):
        if not include_done and item.done:
            return False
        return True if keyword == "" else keyword in item.text

    print(filter(match, list(todo_items.values())))
    return list(filter(match, list(todo_items.values())))


@app.get("/todo/{item_id}")
def get_todo_item(item_id: int):
    return todo_items[item_id]


@app.post("/todo")
def create_todo_item(item: TodoItemInput):
    new_item = TodoItem(id=generate_id(), text=item.text, done=False)
    todo_items[new_item.id] = new_item
    return new_item


@app.put("/todo/{item_id}")
def update_todo_item(item_id: int, item: TodoItem):
    if not item_id in todo_items:
        raise HTTPException(status_code=404, detail="Item not found")
    todo_items[item_id] = item


@app.delete("/todo/{item_id}")
def delete_todo_item(item_id: int):
    if not item_id in todo_items:
        raise HTTPException(status_code=404, detail="Item not found")
    del todo_items[item_id]
