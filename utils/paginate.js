export const paginate = (blogs, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return blogs.slice(startIndex, startIndex + pageSize);
   };