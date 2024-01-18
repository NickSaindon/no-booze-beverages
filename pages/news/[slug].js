import Blog from '../../models/Blog';
import Layout from '../../components/Layout';
import Link from 'next/link';
import db from '../../utils/db';
import moment from 'moment';
import parse from 'html-react-parser';

const NewsPost = (props) => {
  const { news } = props;

  return (
    <Layout 
      title={news.title}
      description={news.description}
    >
      <div className="blog-post-container bg-white">
        <div className="container">
          <div className="row">
            <Link href='/news'>
              <div className="my-3">
                <i className="bi bi-arrow-left"></i>
                <span>Back to News Articles</span>
              </div>
            </Link>
            <div className="blog-post-header">
              <h1>{news.title}</h1>
              <div className="fst-italic mb-2">Posted on  {moment(new Date(news.createdAt)).format('LL')} by {news.author}</div>
              <div className="blog-header-img" style={{backgroundImage: `url(${news.headerImage})`}}></div>
            </div>
          </div>
          <div className="row">
            <div className="blog-post py-5">
              <div className="ql-snow ql-editor">{parse(news.article)}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewsPost; 

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const blog = await Blog.findOne({slug}).lean();
    await db.disconnect();
    return {
      props: {
        news: db.convertDocToObj(blog)
      }
    };
  }