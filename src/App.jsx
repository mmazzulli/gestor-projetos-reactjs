
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Empresa from "./pages/Empresa";
import NewProjects from "./pages/newprojects/NewProjects";
import Contatos from "./pages/Contatos";
import NotFound from './pages/notFound';
import Navegacao from './components/layout/navegacao/Navegacao';
import Footer from './components/layout/footer/Footer';
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';


function App() {

       return (
    <div className='container'>
    <Navegacao />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/empresa' element={<Empresa />} />
      <Route path='/newprojects' element={<NewProjects />} />
      <Route path='/contatos' element={<Contatos />} />
      <Route path='/projetos' element={<Projects />} />
      <Route path='/project/:id' element={<Project />} />
      {/* <Route path='/projetos/:id' element={<Projects />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
     <Footer />
     </div>
    
  )
}

export default App
