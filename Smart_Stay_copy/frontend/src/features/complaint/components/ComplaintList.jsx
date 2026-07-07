import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ComplaintCard from "./ComplaintCard";
import { LayoutDashboard } from "lucide-react";

const COLUMNS = [
  { id: "pending", title: "Pending", color: "border-amber-400", bg: "bg-amber-50" },
  { id: "in-progress", title: "In Progress", color: "border-blue-400", bg: "bg-blue-50" },
  { id: "resolved", title: "Resolved", color: "border-emerald-400", bg: "bg-emerald-50" },
  { id: "completed", title: "Completed", color: "border-indigo-400", bg: "bg-indigo-50" },
];

const ComplaintList = ({
  complaints = [],
  role,
  onStatusChange,
  onDelete,
}) => {
  const [board, setBoard] = useState({
    pending: [],
    "in-progress": [],
    resolved: [],
    completed: []
  });

  
  useEffect(() => {
    const newBoard = {
      pending: [],
      "in-progress": [],
      resolved: [],
      completed: []
    };
    
    complaints.forEach(c => {
      if (newBoard[c.status]) {
        newBoard[c.status].push(c);
      } else {
        newBoard.pending.push(c); 
      }
    });
    
    setBoard(newBoard);
  }, [complaints]);

  const onDragEnd = (result) => {
    if (role === "tenant") return; 

    const { source, destination, draggableId } = result;
    
    
    if (!destination) return;
    
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    
    const sourceCol = [...board[source.droppableId]];
    const destCol = [...board[destination.droppableId]];
    const [movedItem] = sourceCol.splice(source.index, 1);
    movedItem.status = destination.droppableId;
    destCol.splice(destination.index, 0, movedItem);
    
    setBoard(prev => ({
      ...prev,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    }));
    
    
    if (source.droppableId !== destination.droppableId) {
      onStatusChange(draggableId, destination.droppableId, "Status updated via drag and drop");
    }
  };

  if (!complaints.length) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-200 border-dashed">
        <LayoutDashboard size={48} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">
          No Complaints Found
        </h2>
        <p className="mt-2 text-slate-500">
          Everything looks good! There are no active complaints.
        </p>
      </div>
    );
  }

  
  const isDraggable = role === "admin" || role === "owner";

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto pb-4 hide-scrollbar">
        {COLUMNS.map(col => (
          <div key={col.id} className="min-w-[300px] flex flex-col h-full bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className={`px-4 py-3 border-t-4 bg-white shadow-sm flex justify-between items-center ${col.color}`}>
              <h3 className="font-bold text-slate-800">{col.title}</h3>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                {board[col.id].length}
              </span>
            </div>
            
            <Droppable droppableId={col.id} isDropDisabled={!isDraggable}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-3 min-h-[500px] transition-colors ${snapshot.isDraggingOver ? col.bg : ''}`}
                >
                  {board[col.id].map((complaint, index) => (
                    <Draggable 
                      key={complaint._id} 
                      draggableId={complaint._id} 
                      index={index}
                      isDragDisabled={!isDraggable}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-3 ${snapshot.isDragging ? 'shadow-xl scale-[1.02] rotate-1 z-50' : 'shadow-sm'}`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <ComplaintCard
                            complaint={complaint}
                            role={role}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                            isBoardView={true}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ComplaintList;