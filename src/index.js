import React from "react";
import "./index.css";
import { render } from "react-dom";
import axios from "axios";

// default handle
let username = "joel-huang";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cursor: "|",
      query: "",
      data: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.search);
  }

  componentWillUnMount() {
    document.removeEventListener("keydown", this.search);
  }

  search(k) {
    
    let regex = new RegExp(/^[a-z\-\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
    console.log(k.key);
    console.log(regex.test(k.key));
    console.log(this.state.query);

    // if enter is pressed and the field is not empty, set the
    // username to the search term and clear the search term
    if (k.key === 'Enter' && this.state.query !== "") {
      username = this.state.query;
      this.setState({query: ""});
    } 

    else if (k.key === 'Backspace') {
        this.setState({query: this.state.query.slice(0, -1)});
    }
    
    // if alphanumeric, add it to the search term.
    else if (regex.test(k.key) && k.key.length === 1) {
        this.state.query += k.key;
    }
  }  

  handleClick() {
    axios.get('https://api.github.com/users/' + username + '/events')
      .then(response => this.setState({data: response.data}));
  }

  // JSON: {id, type, actor, repo, payload, public, created_at}
  render() {
    const ghUrl = "https://github.com/" + username;
    const logoText = require("octicons")["logo-github"].toSVG({"height": 18, "class": "light"});
    const logo = require("octicons")["mark-github"].toSVG({"height": 18});
    const search = require("octicons")["search"].toSVG({"height": 18});
    const items = this.state.data;
    const listItems = []
    items.forEach(function(item){
      if (item.type === "PushEvent") {
        listItems.push(item);
      }
    });

    this.handleClick();

    return (
      <div className='mid'>
        <div className='search'>
          <div className='left-float' dangerouslySetInnerHTML={{__html: search}} />
          <div className='search-field'>
            {this.state.query + this.state.cursor}
          </div>
        </div>
        <table className='activity-table'>
          <thead>
            <tr>
              <th className='activity-table-title' colSpan='5'>
                <div className='left-float' dangerouslySetInnerHTML={{__html: "Push Activity"}} />
                <div className='right-float' dangerouslySetInnerHTML={{__html: logoText}} />
                <div className='logo' dangerouslySetInnerHTML={{__html: logo}} />
              </th>
            </tr>
            <tr>
              <th>User</th>
              <th>Timestamp</th>
              <th>ID</th>
              <th>Type</th>
              <th>Repository</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) =>
              <tr key= {item.id}>
                <td><img className='avatar' src={item.actor.avatar_url + 'size=30'} alt=""/></td>
                <td>{item.created_at.split("T")[0]}</td>
                <td>{item.actor.login}</td>
                <td>{item.type.split("E")[0]}</td>
                <td>{item.repo.name.split("/")[1]}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='5'><a href={ghUrl}>{ghUrl.split("//")[1]}</a></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));