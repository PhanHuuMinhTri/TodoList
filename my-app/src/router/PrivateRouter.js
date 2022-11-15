import { Route, Routes } from "react-router-dom";
import ListTodo from "../components/ListTodo/ListTodo.component";
import { AddTodo } from "../components";
import EditTodo from "../components/EditTodo/EditTodo";
const PrivateRouter = () => (
  <Routes>
    <Route path='/' index element={<ListTodo />} />
    <Route path='/add' element={<AddTodo />} />
    <Route path='/:id/' element={<EditTodo />} />
    <Route
      path='*'
      element={
        <>
          <h1>404 NOT FOUND</h1>
        </>
      }
    />
  </Routes>
);

export default PrivateRouter;
