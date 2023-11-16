import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import db from '../utils/db';
import gsap from 'gsap';
// import NewsArticle from '../models/News';
import moment from 'moment';
import data from '../utils/data';
import Pagination from "react-bootstrap/Pagination";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const News = (props) => {
  const { news } = props;
  const [state, setState] = useState({
    data: [],
    limit: 8,
    activePage: 1
  });

  useEffect(() => {
    // gsap.timeline()
    // .fromTo(".news-text .header-one", { y:-100, opacity:0, ease: 1, duration: 0.3 }, {y: 0, opacity: 1})
    // .fromTo(".news-text .header-two", { opacity: 0, ease: 1, duration: 0.5 }, {opacity: 1})
    // .fromTo(".news-text p", { y: 100, opacity: 0, ease: 1, duration: 0.3 }, {y: 0, opacity: 1})
    // .delay(1.2);

      setState((prev) => ({
        ...prev,
        data: data.news
      }));

  }, [state.limit]);

  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));

        setState((prev) => ({
          ...prev,
          data: data.news
        }));

  };

  return (
    <Layout 
      title="Dragon Organics | News"
      description="Findout about the latest products with Dragon Organics and the many wonderful Thai botanicals.">
      <div className="news-container bg-white">
        <div className="container">
            <h1 className="fw-bold text-primary">Get the 411 | No Booze Beverages Blog</h1>
        </div>
        <div className="container">

<div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
{state.data.map((news) => (
  <div className="col" key={news.slug}>
    
    <div className="card shadow-sm">
      <div className="bd-placeholder-img card-img-top" style={{backgroundImage: `url(${news.headerImage})`}}></div>

      <div className="card-body">
        <h3 className="mb-0 fw-bold text-primary">{news.title}</h3>
        <p className="card-text">{news.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">03/17/2024</small>
        </div>
      </div>
    </div>
  </div>
    ))}
</div>
<Pagination className="py-4">
        {state.data.map((_, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
              active={index + 1 === state.activePage}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
</div>
      </div>
    </Layout>
  )
}

export default News;

// export async function getServerSideProps() {
//   await db.connect();
//   const news = await NewsArticle.find({}).lean();
//   await db.disconnect();
//   return {
//     props: {
//       news: news.map(db.convertDocToObj)
//     }
//   }
// }