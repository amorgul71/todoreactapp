import React, { useState } from "react";

function App() {

  const [todoText, setTodoText]= useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const editTodo= (id)=> {
    console.log(id);
    setIsEdit(true);
    const searchedTodo=todos.find((item) => item.id === id);
    setTodoText(searchedTodo.text);
  }

  const changeIsDone= (id) => {
   
    const searchedTodo= todos.find ((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
   
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

    const newTodo = {
      id: new Date().getTime(),
      isDone: false,
      text: todoText,
      date: new Date(),
    };
    setTodos([...todos, newTodo ]);
    setTodoText("");
    console.log(newTodo);

  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
      <input 
      value={todoText}
      type="text" 
      className="form-control" 
      placeholder="Type your todos"
      onChange={(event)=> setTodoText(event.target.value)}
     
    
      />
      <button 
      className="btn btn-primary" 
      type="submit" 
      
      >
        ADD
      </button>
    </div>

      </form>
      {
        todos.length <=0 ? (
          <p className="text-center my-5">You don't have any todos yet.</p>
        ) : (
        <>
        {todos.map((item) => (
        
          <div className= {`alert alert-${item.isDone === true ? "warning" : "secondary"} d-flex justify-content-between align-items-center`}>
         <p> {item.text}</p>
          <div>
            <button className="btn btn-sm btn-success mx-1" 
            onClick={()=> editTodo(item.id)}
            
            >Edit
            </button>


          <button onClick={()=> changeIsDone(item.id)} className="btn btn-sm btn-secondary">
            { item.isDone === false ? "Done" : "Undone"}</button>


          </div>
        </div>
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
