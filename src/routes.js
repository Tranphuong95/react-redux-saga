import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './contains/users';
import AddUser from './contains/users/components/AddUser';
import User from './contains/users/components/User';

const ListRouter = (props) => {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path='users/add' element={<AddUser />} />
      <Route path='users/:userId' element={<User />} />
    </Routes>
  )
}

export default ListRouter