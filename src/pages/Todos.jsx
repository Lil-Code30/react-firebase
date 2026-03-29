import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { signOut } from "firebase/auth";

function Todos({ credentials }) {
  const [newtitle, setNewTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const todoCollRef = collection(db, `todos/${credentials.uid}/items`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(todoCollRef, { title: newtitle, completed: false });
    document.getElementById("new-todo").value = "";
  };

  useEffect(() => {
    const q = query(todoCollRef);
    const todoUnSub = onSnapshot(
      q,
      (snapshot) => {
        const todosArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosArr);
      },
      (err) => console.error("Snapshot Error: ", err),
    );
    return () => todoUnSub();
  }, []);

  return (
    <>
      <h2 className="todos-section-title">Add Todo</h2>
      <form className="todos-form" onSubmit={handleSubmit}>
        <label className="todos-label" htmlFor="new-todo">
          Title:
        </label>
        <input
          className="todos-input"
          type="text"
          placeholder="Todo Title"
          id="new-todo"
          value={newtitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="todos-btn" type="submit">
          Add Todo
        </button>
      </form>

      <hr className="todos-hr" />
      <div>
        <button className="todos-logout-btn" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
      <h2 className="todos-section-title">
        Showing Todos of <span>{credentials.email}</span>
      </h2>
      <hr className="todos-hr" />
      <ul className="todos-list">
        {todos.length === 0 ? (
          <li className="todos-item-empty">No Todos Found</li>
        ) : (
          todos.map((todo) => (
            <li
              className={`todos-item${todo.completed ? " completed" : ""}`}
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={async (e) => {
                    const todoDocRef = doc(todoCollRef, todo.id);
                    updateDoc(todoDocRef, { completed: e.target.checked });
                  }}
                  style={{ marginRight: "0.7em" }}
                />
                {todo.title}
              </span>
              <button
                onClick={async () => {
                  const todoDocRef = doc(todoCollRef, todo.id);
                  await deleteDoc(todoDocRef);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53935",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  marginLeft: "0.7em",
                  padding: 0,
                }}
                title="Delete Todo"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default Todos;
