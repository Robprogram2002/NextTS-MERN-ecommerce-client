import AuthHOC from '../../components/AuthHOC';
import UserNav from '../../components/Layout/Nav/UserNav';

const dashboard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col">user history page</div>
    </div>
  </div>
);

export default AuthHOC(dashboard);
