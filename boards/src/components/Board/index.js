import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from 'axios';
import database from "./data";
import Column from "./column";

const Index = () => {
  const [data, setData] = useState({});
  const [newColumn, setNewColumn] = useState("");
  const [taskColumn, setTaskColumn] = useState(["four"]);
  const getData = async() => {
    let response = await axios.get('http://127.0.0.1:8000/task-list/')
    // console.log(response.data)
    return response.data;
  }
  let transformData = (data) => {
  let transformedData = {};

  // get the status from the task
  // creates an array of status
  let status = data.map(task => {
    return task.status
  });

  // map through the status
  // create an object with key corresponding to the status and set it to an empty array
  // filter the data and group task based on the status
  //    if the data's status is exactly equal to the map status

  status.map(stats => {
    transformedData[stats] = [];
    let filteredData = data.filter(d => {
      if (d.status === stats) {
        transformedData[stats].push(d);
      }
    }) ;
    return filteredData
  });

  return transformedData;

}

  useEffect(async () => {
    let data = await getData()
    // console.log(data)
    let transformedData = transformData(data)
    setData(transformedData);
  }, []);

  const onDragEnd = async(result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    const id = result.draggableId
    let cards =  await getData()
    let card = cards.filter(obj => {return obj.id == id})
    console.log(card[0].title)
    const status = destination.droppableId
    const url = `http://127.0.0.1:8000/task-update/${id}/`
    const d = JSON.stringify({
      id: id,
      title: card[0].title,
      status: status,
      date: "2021-12-22"
    })
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const newData = Array.from(data[source.droppableId]);
      const task = newData[source.index];
      newData.splice(source.index, 1);
      newData.splice(destination.index, 0, task);
      setData({
        ...data,
        [source.droppableId]: newData,
      });
      return;
    }

    const column = Array.from(data[source.droppableId]);
    const remTask = column[source.index];
    column.splice(source.index, 1);

    const destinationData = Array.from(data[destination.droppableId]);
    destinationData.splice(destination.index, 0, remTask);
    axios({
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      data: d,
      url: url
      })
    .catch(error => {
      console.log(error)
    })
    // .then(updateData())
    // await axios.post(url, d)
    // axios.post('http://127.0.0.1:8000/task-create/', {"id": (Math.random() * 1000), "title": title, "status": status, "date": "2021-12-22"})
    // axios.delete(`http://127.0.0.1:8000/task-delete/${id}`)
    setData({
      ...data,
      [source.droppableId]: column,
      [destination.droppableId]: destinationData,
    });
  };

  const updateColumn = async(e) => {
    const id = Number(e.draggableId);
    const url = `http://127.0.0.1:8000/task-update/${id}/`
    

    const title = "a"
    const status = e.destination.droppableId
    const data = JSON.stringify({
      id: id,
      title: title,
      status: status,
      date: "2021-12-22"
    })
    await axios.put(url, data)
    axios({
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: url
      })
    .catch(error => {
      console.log(error)
    })
    .then(updateData())
  }

  const handleChange = (e) => {
    setNewColumn(e.target.value);
  };

  const handleTaskSubmit = (columnId, task) => {

    let copyData = data[columnId];
    let newData = [...copyData, task];

    setData({...data, [columnId]: newData});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newColumn.length > 0) {
      setData({ ...data, [newColumn]: [] });
      setNewColumn("");
    }
  };
   const updateData = async() => {
    let data =  await getData()
    console.log(data)
    let transformedData = transformData(data)
    setData(transformedData);
  }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex overflow-auto px-5 mt-5 mb-5 pb-5">
        {/* <div className=""> */}
        {Object.keys(data).map((column, index) => {
          return (
            <Column
              key={index}
              column={column}
              tasks={data[column]}
              handleTaskSubmit={handleTaskSubmit}
              handleSubmit={handleSubmit}
              updateData={updateData}
            />
          );
        })}
        <div className="col-lg-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={newColumn}
                onChange={handleChange}
                className="form-control bg-light border-primary"
                placeholder="Add a new column"
              />
            </div>
          </form>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Index;
