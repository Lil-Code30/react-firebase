import React, { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";

function Todos() {
  const [newtitle, setNewTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const todoCollRef = collection(db, "todos");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(todoCollRef, { title: newtitle });
    document.getElementById("new-todo").value = "";
  };

  useEffect(() => {
    const q = query(todoCollRef);
    const todoUnSub = onSnapshot(
      q,
      (snapshot) => {
        const todosArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setTodos(todosArr);
      },
      (err) => console.error("Snapshot Error: ", err),
    );
    return () => todoUnSub();
  }, []);

  return (
    <>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Title:</label>
        <input
          type="text"
          placeholder="Todo Title"
          id="new-todo"
          value={newtitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <hr style={{}} />
      <h2>All My Todos:</h2>
      <ul style={{ listStyle: "none" }}>
        {todos.length == 0 ? (
          <li>No Todos Found</li>
        ) : (
          todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
        )}
      </ul>
    </>
  );
}

export default Todos;
