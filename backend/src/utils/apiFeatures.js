class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => delete queryCopy[field]);

    // Filter for price
    if (queryCopy.price) {
      this.query = this.query.find({
        price: {
          $gte: queryCopy.price[0],
          $lte: queryCopy.price[1],
        },
      });
    }

    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}
export default ApiFeatures;
