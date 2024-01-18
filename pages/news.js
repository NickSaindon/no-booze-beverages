import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import db from '../utils/db';
import gsap from 'gsap';
import Blog from '../models/Blog';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import data from '../utils/data';
import {paginate} from '../utils/paginate';
import BlogPagination from "../components/BlogPagination";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const News = (props) => {
  const { blogs } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const paginatedPosts = paginate(blogs, currentPage, pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // gsap.timeline()
    // .fromTo(".news-text .header-one", { y:-100, opacity:0, ease: 1, duration: 0.3 }, {y: 0, opacity: 1})
    // .fromTo(".news-text .header-two", { opacity: 0, ease: 1, duration: 0.5 }, {opacity: 1})
    // .fromTo(".news-text p", { y: 100, opacity: 0, ease: 1, duration: 0.3 }, {y: 0, opacity: 1})
    // .delay(1.2);

  }, []);


  return (
    <Layout 
      title="Dragon Organics | News"
      description="Findout about the latest products with Dragon Organics and the many wonderful Thai botanicals."
    >
      <div className="news-container page-contain bg-white">
        <Container className="container">
          <h1 className="fw-bold text-primary">Get the 411 | No Booze Beverages Blog</h1>
        </Container>
      <Container className="container">
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
        {paginatedPosts.filter(paginatedPosts => paginatedPosts.published === true).map((blog) => (
            <Col key={blog.slug}>
              <Link href={`/news/${blog.slug}`} legacyBehavior>
              <div className="card news-cards shadow-sm">
                <div className="bd-placeholder-img card-img-top" style={{backgroundImage: `url(${blog.headerImage})`}}></div>
                <div className="card-body">
                  <h3 className="mb-0 fw-bold text-primary">{blog.title}</h3>
                  <p className="card-text">{blog.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">03/17/2024</small>
                  </div>
                </div>
              </div>
              </Link>
            </Col>
          ))}
        </Row>
        <BlogPagination
          blogs={blogs.length} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
      </Container>
      </div>
    </Layout>
  )
}

export default News;

export async function getServerSideProps() {
  await db.connect();
  const blogs = await Blog.find({}).lean();
  await db.disconnect();
  return {
    props: {
      blogs: blogs.map(db.convertDocToObj)
    }
  }
}