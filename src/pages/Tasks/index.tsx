import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import moment from "moment";
import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    setTasks(response.data);
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    navigate("/cadastro");
  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  function editTask(id: number) {
    navigate(`/cadastro/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Minhas Anotações</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Nova Anotação
        </Button>
      </div>
      <br />
      {tasks.map((task) => (
        <Card key={task.id} className="task-card">
          <Card.Header className="texto-titulo">{task.title} <Card.Text className="texto">Última alteração: {formatDate(task.updated_at)} {task.finished ? " (Anotação arquivada)" : ""}</Card.Text></Card.Header>
          <Card.Body>
            <pre style={{ whiteSpace: "pre-wrap" }}><Card.Text>{task.description}</Card.Text></pre>
            <div className="text-center">
              <Button
                size="sm"
                variant="outline-primary"
                disabled={task.finished}
                onClick={() => editTask(task.id)}
              >
                Alterar
              </Button>{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                disabled={task.finished}
                onClick={() => finishedTask(task.id)}
              >
                Arquivar
              </Button>{" "}
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Excluir
              </Button>{" "}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Tasks;