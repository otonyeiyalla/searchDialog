import React, {
  Component
} from 'react';
import './App.css';
import StudentInfo from './Student/StudentInfo'
import {
  Col,
  Preloader
} from "react-materialize";

console.log(window)

class App extends Component {


  state = {
    items: [],
    data: {},
    tag: {},
    error: null,
    isLoaded: false
  };

  async componentDidMount() {
    const url = 'Enter a url with firstName, lastName, picture and grades';
    //const res = await fetch(url);
    //const data = await res.json();

    await fetch(url)
      .then(res => res.json())
      .then((result) => {
          //console.log("the result ", result)
          const data = result;
          this.setState({
            isLoaded: true
          })


          const obj = {};
          const obj1 = {}
          for (const item of data.students) {
            item.tags = [];
            const key = item.firstName + " " + item.lastName
            obj[key] = item
            obj1[key] = []
          }

          this.setState({
            data: obj,
            items: data.students,
            tag: obj1,
          })
          // this.setState({items: data.students, isLoaded: true, data: data.students.map((data) => (data.firstName + " " + data.lastName))})
          //console.log("the data ", this.state.data);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })


  }

  updateTag(payload) {
    this.state.tag[payload.studentName].push(payload.tag);
  }

  handleTagChange = (e) => {
    const search = e.target.value;
    const result = [];
    for (const key of Object.keys(this.state.tag)) {
      let tags = this.state.tag[key];
      tags = tags.map(tag => tag.text)
      const tagString = tags.join();
      if (tagString.toLowerCase().includes(search.toLowerCase())) {
        result.push(this.state.data[key]);
      }
    }

    this.setState({
      items: result
    });
  }

  handleChange = (e) => {

    const search = e.target.value;
    //console.log(`the Handled Change ${search} `);
    const result = [];
    for (const key of Object.keys(this.state.data)) {
      //console.log("The parent data ", Object.keys(this.state.data))
      if (key.toLowerCase().includes(search.toLowerCase())) {
        result.push(this.state.data[key]);
      }
    }
    //console.log("The result ", result)

    this.setState({
      items: result
    });
  }




  render() {
      //const items = this.state.items.slice(0);
      const items = this.state.items;
      const {
        isLoaded,
        error
      } = this.state;

      //console.log("the students in state ", this.state.items, "</br>the students ", items);
      if (error) {
        //console.log("there is an error somewhere");
        return <div > Error: {
          error.message
        } </div>;
      } else if (!isLoaded) {
        return (
        <div > 
          < Col s = {4} >
          <Preloader size = "big" />
          </Col>
        </div > );
      } else {
        return ( 
        <div className = "App" >
          <header className = "App-header" >
          <input type = "text"
          placeholder = "Search by name"
          name = "name"
          onChange = {
            this.handleChange
          }
          /> 
          <input type = "text"
          placeholder = "Search by tag"
          name = "name"
          onChange = {
            this.handleTagChange
          }
          />    {
          items.map(data => ( < StudentInfo key = {
                data.firstName
              }
              datas = {
                data
              }
              tagUpdate = {
                this.updateTag.bind(this)
              }
              /> ))} 
              </header > 
              </div >
            );
          }
        }

      }


      export default App;
