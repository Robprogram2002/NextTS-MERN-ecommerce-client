import Link from 'next/Link';

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/user/dashboard">
          <span className="nav-link " style={{ cursor: 'pointer' }}>
            {' '}
            History{' '}
          </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/change-password">
          <span className="nav-link" style={{ cursor: 'pointer' }}>
            {' '}
            Password
          </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/wishlist">
          <span className="nav-link" style={{ cursor: 'pointer' }}>
            {' '}
            wishlist{' '}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
