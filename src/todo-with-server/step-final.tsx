import { useEffect, useState } from "react";

import { type TodoItem, TodoApiMock, TodoApiClient } from "./api";

const INITIAL_TODO: TodoItem[] = [
  { id: 1, text: "todo-item-1", done: false },
  { id: 2, text: "todo-item-2", done: true },
];

/** モックと実際のAPIクライアントを切り替えるためのコメントアウト */
const todoApi = new TodoApiMock(INITIAL_TODO);
// const todoApi = new TodoApiClient('http://localhost:8080')

type TodoListItemProps = {
  item: TodoItem;
  onCheck: (checked: boolean) => void;
  onDelete: () => void;
};

function TodoListItem({ item, onCheck, onDelete }: TodoListItemProps) {
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={item.done}
        onChange={(ev) => onCheck(ev.currentTarget.checked)}
      />
      <p style={{ textDecoration: item.done ? "line-through" : "none" }}>
        {item.text}
      </p>
      <button className="button-small" onClick={() => onDelete()}>
        ×
      </button>
    </div>
  );
}

type CreateTodoFormProps = {
  onSubmit: (text: string) => void;
};

function CreateTodoForm({ onSubmit }: CreateTodoFormProps) {
  const [text, setText] = useState("");
  return (
    <div className="CreateTodoForm">
      <input
        placeholder="新しいTodo"
        size={60}
        value={text}
        onChange={(ev) => setText(ev.currentTarget.value)}
      />
      <button onClick={() => onSubmit(text)}>追加</button>
    </div>
  );
}

type ValueViewerProps = {
  value: unknown;
};

function ValueViewer({ value }: ValueViewerProps) {
  return (
    <pre className="ValueViewer">{JSON.stringify(value, undefined, 2)}</pre>
  );
}

export default function App() {
  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null);
  const [keyword, setKeyword] = useState("");
  const [showingDone, setShowingDone] = useState(false);

  const reloadTodoItems = async () => {
    setTodoItems(await todoApi.queryItems(keyword, showingDone));
  };

  useEffect(() => {
    reloadTodoItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1>ToDo</h1>
      <div className="App_todo-list-control">
        <input
          placeholder="キーワードフィルタ"
          value={keyword}
          onChange={(ev) => setKeyword(ev.target.value)}
        />
        <input
          id="showing-done"
          type="checkbox"
          checked={showingDone}
          onChange={(ev) => setShowingDone(ev.target.checked)}
        />
        <label htmlFor="showing-done">完了したものも表示する</label>
        <button onClick={() => reloadTodoItems()}>更新</button>
      </div>
      {todoItems === null ? (
        <div className="dimmed">データを取得中です...</div>
      ) : todoItems.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="App_todo-list">
          {todoItems.map((item) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={async (checked) => {
                await todoApi.updateItem({ ...item, done: checked });
                reloadTodoItems();
              }}
              onDelete={async () => {
                await todoApi.deleteItem(item.id);
                reloadTodoItems();
              }}
            />
          ))}
        </div>
      )}
      <CreateTodoForm
        onSubmit={async (text) => {
          await todoApi.createItem(text);
          reloadTodoItems();
        }}
      />
      <ValueViewer value={todoItems} />
    </div>
  );
}
