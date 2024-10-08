import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Form from './component/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Record from './component/Record';
import EditRecord from './component/EditRecord';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path="/emprecord" element={<Record />} />
          <Route path='/editrecord/:id' element={<EditRecord />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
