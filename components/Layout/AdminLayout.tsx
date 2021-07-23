import { FC } from 'react';
import AdminNav from './Nav/AdminNav';

const AdminLayout: FC = ({ children }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col-md-10">{children}</div>
    </div>
  </div>
);

export default AdminLayout;
