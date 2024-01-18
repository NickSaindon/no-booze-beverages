import { useSession } from 'next-auth/react';
import Link from 'next/link'

const SideNav = () => {
  const { data: session } = useSession();

  return (
    <div className="card side-nav">
      <div className="card-body">
      {session.user.isAdmin &&
        <nav className="nav flex-column">
          <Link href="/admin/dashboard" className="nav-link active" aria-current="page">
            Dashboard
          </Link>
          <Link href="/admin/categories" className="nav-link">
            Categories
          </Link>
          <Link href="/admin/products" className="nav-link">
            Products
          </Link>
          <Link href="/admin/users" className="nav-link">
            Users
          </Link>
          <Link href="/admin/orders" className="nav-link">
            Orders
          </Link>
          <Link href="/admin/blogs" className="nav-link">
            Blogs
          </Link>
        </nav>
      }
      </div>
    </div>
  )
}

export default SideNav;