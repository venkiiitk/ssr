import React, { Component } from "react";

class Grid extends Component {
  constructor(props) {
    super(props);

    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = this.props.staticContext.data;
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    };

    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id);
    }
  }
  fetchRepos(lang) {
    this.setState(() => ({
      loading: true,
    }));

    this.props.fetchInitialData(lang).then((repos) =>
      this.setState(() => ({
        repos,
        loading: false,
      }))
    );
  }
  render() {
    const { loading, repos } = this.state;

    if (loading === true) {
      return <p>LOADING</p>;
    }
    //const syndicatedScripts = document
    //  .createRange()
    // .createContextualFragment(repos.clientsideIncludes.js);
    //const syndicatedStyles = document
    //  .createRange()
    //  .createContextualFragment(repos.clientsideIncludes.css);
    // document.head.appendChild(syndicatedStyles);
    // document.body.appendChild(repos.htmlModules.header);
    //// document.body.appendChild(reposhtmlModules.footer);
    //document.body.appendChild(syndicatedScripts);
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="syndicated-header"
          dangerouslySetInnerHTML={{ __html: repos.clientsideIncludes.css }}
        ></div>
        <div
          className="syndicated-header"
          dangerouslySetInnerHTML={{ __html: repos.htmlModules.header }}
        ></div>
        <div
          className="syndicated-header"
          dangerouslySetInnerHTML={{ __html: repos.htmlModules.footer }}
        ></div>
        <div
          className="syndicated-header"
          dangerouslySetInnerHTML={{ __html: repos.clientsideIncludes.js }}
        ></div>
      </div>
    );
  }
}

export default Grid;
