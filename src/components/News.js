import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";

export class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 5,
    categary: "general",
  };
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    categary: propTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      //   toto,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&categary=${this.props.categary}&apiKey=559b650f3596452a96ce643da61ff375&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log("parsedata", parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });

    this.handlePreClick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&categary=${this.props.country}&apiKey=559b650f3596452a96ce643da61ff375&page=${
        this.setState.page - 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log("parsedata", parsedata);
      this.setState({
        page: this.setState.page - 1,
        articles: parsedata.articles,
        loading: false,
      });

      this.setState = {
        page: this.state.page - 1,
      };
    };
    this.handleNxtClick = async () => {
      if (
        !this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      ) {
        console.log("this.state.totalResults else", this.state.totalResults);
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&categary=${this.props.country}&apiKey=559b650f3596452a96ce643da61ff375&page=${
          this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log("parsedata", parsedata);
        this.setState = {
          page: this.state.page + 1,
          articles: parsedata.articles,
          loading: false,
        };
      }
    };
  }
  render() {
    return (
      <div className="container my-3">
        <h2>Top Headline</h2>
        {this.setState.loading & <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.id}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    discription={element.discription ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.hindustantimes.com/ht-img/img/2023/07/27/1600x900/Bawaal_controversy_1690440716325_1690440728631.jpeg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-primary"
            onClick={this.handlePreClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            class="btn btn-primary"
            onClick={this.handleNxtClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
