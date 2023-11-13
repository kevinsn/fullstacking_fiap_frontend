import React, { useState, ChangeEvent, useEffect } from "react";

import { Button, Form as BootstrapForm } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../services/api";

import "./index.css";

interface ITask {
  title: string;

  description: string;
}

const Form: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [model, setModel] = useState<ITask>({
    title: "",
    description: "",
  });

  useEffect(() => {
    console.log(id);

    // findTask(id);
  }, [id]);

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }


  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = id
      ? await api.put(`/tasks/${id}`, model)
      : await api.post("/tasks", model);
    back();
  }

  function back() {
    navigate(-1);
  }

  async function findTask(id?: string) {
    try {
      if (!id) {
        console.error('ID is undefined or null');
        return;
      }

      const response = await api.get(`/tasks/${id}`);

      console.log("teste " + JSON.stringify(response));

      if (response.data) {
        setModel({
          title: response.data.title || '',
          description: response.data.description || '',
        });
      } else {
        console.error('Response data is undefined or null');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  }


  return (
    <div className="container">
      <br />

      <div className="task-header">
        <h1>Nova Tarefa</h1>

        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>

      <br />

      <div className="container">
        <BootstrapForm onSubmit={onSubmit}>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Título</BootstrapForm.Label>

            <BootstrapForm.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Descrição</BootstrapForm.Label>

            <BootstrapForm.Control
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </BootstrapForm.Group>

          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
};

export default Form;