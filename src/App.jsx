import React from "react";
import "./App.scss";
import {
  Grid,
} from "@material-ui/core";
import ItemList from "./ItemList";

//funcion principal del componente App
class App extends React.Component {
  constructor(props) {
    super(props);

    try {
      const newTags = window.location.hash
        .split("#tags=")[1]
        .split(",");

      this.state = {
        tags: newTags,
        lists: [1, 2, 3],
      };
    } catch (e) {
      console.log(e);
      this.state = {
        tags: [],
        lists: [1, 2, 3],
      };
    }

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  addTag(newTag) {
    let updatedTags = [...this.state.tags];
    updatedTags.push(newTag);
    this.updateTags(updatedTags);
  }

  removeTag(tagIndex) {   
    let updatedTags = [...this.state.tags];
    updatedTags.splice(tagIndex, 1);
    this.updateTags(updatedTags);
  }

  updateTags(newTags, updateTagURL = true) {
    // update URL with new tags
    if (updateTagURL) {
      window.location.hash=`#tags=${newTags.join(",")}`;
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      try {
        const newTags = window.location.hash
          .split("#tags=")[1]
          .split(",");
        this.setState({
          tags: newTags
        });
      } catch (e) {
        console.log(e);
        this.setState({
          tags: []
        });
      }
    }
  }

  render() {
    const { tags, lists } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        className="container"
      >
        {
          lists.map(list => (
            <Grid item sm={4} key={list}>
              <ItemList listIndex={list} tags={tags} addTag={this.addTag} removeTag={this.removeTag}/>
            </Grid>
          ))
        }
      </Grid>
    );
  }
};

export default App;