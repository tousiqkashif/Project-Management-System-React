import { useState } from "react";
import Newproject from "./Newproject";
import NoprojectSelected from "./NoprojectSelected";
import Projectsidebar from "./Projectsidebar";
import SelectedProject from "./SelectedProject";

function App() {
  const [projectsState , setProjectsState] = useState({
    
    selectedProjectId: undefined,
    projects : [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectsState((prevState) => {
    const taskId = Math.random()
    const newTask = {

      text: text,
      projectId: prevState.selectedProjectId,
      id: taskId,
      
    };

    
    return{
...prevState,
tasks: [newTask , ...prevState.tasks  ]
    };
  });
  }
  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }
    });
  }
  function handleSelectproject(id){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleStartAddproject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleCancelAddproject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

 
  // console.log(projectsState);
  function handleDeleteProject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectsState.tasks}

  />;

  if(projectsState.selectedProjectId === null){
     content = <Newproject onAdd={handleAddProject} onCancel={handleCancelAddproject}/>;
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoprojectSelected onStartAddProject={handleStartAddproject}/>;
  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {

        ...projectData,
        id: projectId
      };

      
      return{
...prevState,
selectedProjectId : undefined,
projects: [...prevState.projects, newProject]
      };
    })
  }

 
  return (
    <main className="h-screen my-8 flex gap-8 ">
    <Projectsidebar onSelectproject={handleSelectproject}
     projects={projectsState.projects} 
     onStartAddProject={handleStartAddproject}
     selectedProjectId={projectsState.selectedProjectId}
     />
    {content}
    
    </main>
  );
}

export default App;
