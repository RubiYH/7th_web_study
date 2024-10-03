import { useReducer } from "react";
import "./App.css";

export default function TodoList() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action?.type) {
      case "changed_draft": {
        return {
          draft: action?.nextDraft,
          todos: state?.todos || [],
        };
      }

      case "add": {
        return state?.draft?.length > 0
          ? {
              draft: "",
              todos: [
                {
                  id: new Date().getTime(),
                  text: state?.draft,
                },
                ...(state?.todos || []),
              ],
            }
          : state;
      }

      case "delete": {
        return { ...state, todos: [...(state?.todos?.filter((t) => t?.id !== action?.id) || [])] };
      }

      case "startEdit": {
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo?.id === action?.id ? { ...todo, isEditing: true } : todo
          ),
        };
      }

      case "edit": {
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo?.id === action?.id ? { ...todo, isEditing: true, text: action?.text } : todo
          ),
        };
      }

      case "doneEdit": {
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo?.id === action?.id ? { ...todo, isEditing: false } : todo
          ),
        };
      }

      default:
        alert("Unknown action: " + action?.type);
        return state;
    }
  });

  return (
    <div className="main">
      <div className="inputBox">
        <input
          value={state?.draft || ""}
          onChange={(e) => {
            dispatch({
              type: "changed_draft",
              nextDraft: e.target.value,
            });
          }}
        />
        <button
          className="add"
          onClick={() => {
            dispatch({ type: "add" });
          }}
        >
          할 일 등록
        </button>
      </div>
      <ul className="todo">
        {state?.todos?.map((item) => (
          <li key={item?.id}>
            <span
              contentEditable={item?.isEditing === true}
              suppressContentEditableWarning
              onBlur={(e) =>
                dispatch({ type: "edit", id: item?.id, text: e?.currentTarget.innerText })
              }
              className={item?.isEditing ? "isEditing" : undefined}
            >
              {item?.text}
            </span>
            <div>
              {item?.isEditing ? (
                <button
                  className="edit"
                  onClick={() => dispatch({ type: "doneEdit", id: item?.id })}
                >
                  완료
                </button>
              ) : (
                <button
                  className="edit"
                  onClick={() => dispatch({ type: "startEdit", id: item?.id })}
                >
                  수정
                </button>
              )}
              <button className="remove" onClick={() => dispatch({ type: "delete", id: item?.id })}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
