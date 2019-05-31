import React, { Component } from "react";
import "./StudentInfo.css";
//import "materialize-css/dist/css/materialize.min.css";
import { Row, Col, Chip, Icon, Button } from "react-materialize";

class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { viewScores: false, tag: [], text: "" };
  }

  /*
  averageGrade takes the grades from the provided data using destructuring
  checks the grades array if it's empty
  if it's not, it converts the contents in the grade to numbers and stores the output in intGrades
  using reduce we find the total sum and by dividing by intGrades.length we get the average grade
  */
  averageGrade = () => {
    const { grades } = this.props.datas;
    if (grades !== null) {
      const intGrades = grades.map(grade => Number(grade));
      const result =
        intGrades.reduce((total, a) => total + a, 0) / intGrades.length;
      //console.log("the result in avg ", result);
      return result;
    }
  };

  handleClick = () => {
    this.setState(prevState => ({ viewScores: !prevState.viewScores }));
  };

  handleSubmit = e => {
    //const data = this.props.datas;
    e.preventDefault();
    //console.log(`the submitted Val ${this.state.text}`);
    if (!this.state.text.length) {
      return;
    }
    const newTag = { text: this.state.text, id: Date.now() };
    const tags = this.props.datas.tags;
    //console.log(this.state);
    this.setState(state => ({ tag: state.tag.concat(newTag), text: "" }));

    const length = tags.length;
    tags.push(newTag);
    const studentName =
      this.props.datas.firstName + " " + this.props.datas.lastName;
    if (tags.length > length) {
      this.props.tagUpdate({
        studentName,
        tag: newTag
      });
    }

    //console.log("After push ", this.props.datas.tags);
  };

  handleTag = e => {
    this.setState({ text: e.target.value });
    /*console.log(
      `the new tag ${e.target.value} the state text ${this.state.text}`
    ); */
  };

  render() {
    //const data = this.props.datas;
    const {
      grades,
      pic,
      firstName,
      lastName,
      email,
      company,
      skill
    } = this.props.datas;
    //console.log("The imported data ", this.props.datas.tag);
    if (this.state.viewScores) {
      let i = 1;
      //console.log("the if loop", grades);
      var view = [];
      view.push(
        <div key={view.toString()}>
          {grades.map(grade => (
            <div key={Math.random()}>
              Test {i++}: {grade}%
            </div>
          ))}
          <br />
          <ul>
            {this.state.tag.map(item => (
              <Chip key={item.id}>{item.text}</Chip>
            ))}
          </ul>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Add a tag"
                name="tag"
                onChange={this.handleTag}
                value={this.state.text}
              />
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="Container">
          <Row>
            <Col s={2}>
              <img src={pic} alt="pic" />
            </Col>

            <Col s={8}>
              <dt className="Header_name">
                {firstName} {lastName}
              </dt>
              <span style={{ fontSize: "14px" }}>
                <dt>Email: {email}</dt>
                <dt>Company: {company}</dt>
                <dt>Skill: {skill}</dt>
                <dt>Average: {this.averageGrade()}%</dt>
                <br />
                {view}
              </span>
            </Col>
            <Col s={2}>
              <Button flat wave="light" onClick={this.handleClick}>
                <Icon Large>{this.state.viewScores ? "remove" : "add"}</Icon>
              </Button>
            </Col>
          </Row>
        </div>
        <hr />
      </div>
    );
  }
}

export default StudentInfo;
