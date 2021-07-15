import AdminHOC from '../../components/AdminHOC';
import AdminNav from '../../components/Layout/Nav/AdminNav';

const dashboard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">admin dashbaord page</div>
    </div>
  </div>
);

export default AdminHOC(dashboard);
