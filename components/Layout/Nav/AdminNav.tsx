import Link from 'next/Link';

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/admin/dashboard">
          <span className="nav-link">Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/product">
          <span className="nav-link">Product</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/products">
          <span className="nav-link">Products</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/category">
          <span className="nav-link">Category</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/sub-categories">
          <span className="nav-link">Sub Category</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/coupon">
          <span className="nav-link">Coupon</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/password">
          <span className="nav-link">Password</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
