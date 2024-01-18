import Pagination from 'react-bootstrap/Pagination';

const BlogPagination = ({ blogs, pageSize, currentPage, onPageChange }) => {

  const pagesCount = Math.ceil(blogs / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    return (
      <div className="my-4">
        <Pagination size="lg">
        {pages.map((page) => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page}

        </Pagination.Item>
        ))}
        </Pagination>

      </div>
    )
  }

export default BlogPagination