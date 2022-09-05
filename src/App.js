import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {

  const [todoText, setTodoText]= useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo]=useState("");

  useEffect (() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    console.log(todosFromLocalStorage);
    if(todosFromLocalStorage===null) {
      localStorage.setItem("todos", JSON.stringify( []));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }

  } ,[])

  


  const deleteTodo = (id)=> {
    console.log(id);
    const filteredTodos = todos.filter(item=> item.id !==id);
    setTodos (filteredTodos)
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };
  



  const changeIsDone= (id) => {
   
    const searchedTodo= todos.find ((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem("todos", JSON.stringify([updatedTodo, ...filteredTodos]));
   
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if(todoText==="") {
      alert("Todo text cannot be empty");
      return;
    }

    
    const hasTodos = todos.find((item) => item.text === todoText);
    if(hasTodos!== undefined) {
      alert("You already have this todo")
      return
    }

    if (isEdit === true) {
      console.log(willUpdateTodo, "todo güncellenecek");
      const searchedTodo= todos.find((item)=> item.id === willUpdateTodo)
      const updatedTodo = {
        ...searchedTodo, 
        text: todoText,
      };

      const filteredTodos=todos.filter(item=> item.id !==willUpdateTodo)
      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem("todos", JSON.stringify([...filteredTodos, updatedTodo ]))
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");

    } else {
    const newTodo = {
      id: new Date().getTime(),
      isDone: false,
      text: todoText,
      date: new Date(),
    }; 
    console.log("newTodo", newTodo);
    setTodos([...todos, newTodo ]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo ]))
    setTodoText("");
   

    }


  };

  return (
    <div className="container">
      <h1 className="text-center my-5 mx-auto bg-info text-white w-50 align-items-center">What are your errands?</h1>
      <TodoForm
      handleSubmit={handleSubmit}
      todoText={todoText}
      setTodoText={setTodoText}
      isEdit={isEdit}
      
      />
      {
        todos.length <=0 ? (
          <span>
            <p className="text-center my-5">You don't have any errands yet. </p>
            <p className="text-center my-5">Please add your errands.. </p>
          </span>
          
          
        ) : (
        <>
        {todos.map((item) => (
        <Todo item= {item} 
        deleteTodo={deleteTodo}
        setIsEdit = {setIsEdit}
        setWillUpdateTodo = {setWillUpdateTodo}
        setTodoText = {setTodoText}
        changeIsDone= {changeIsDone} 
        />

        
        
        )

        )
        }
        </>
        )
      }
   
    </div>
  );
}

export default App;
