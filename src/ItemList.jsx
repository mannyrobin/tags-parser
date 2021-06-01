import { Button, Card, List, Input, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import React from "react";
import "./ItemList.scss";

//funcion principal del componente App
class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTagValue: "",
    };
  }

  setNewTag = (text) => {
    this.setState({
      newTagValue: text,
    });
  }

  render() {
    const { listIndex, tags, addTag, removeTag } = this.props;
    const { newTagValue } = this.state;

    return (
      <Card className="list-card">
        <div className="new-tag-input">
          <Input
            placeholder="Enter a new tag"
            onChange={(ev) => {
              this.setNewTag(ev.target.value);
            }}
          />
          <Button
            variant="outlined"
            size="small"
            className="add-new-tag-button"
            onClick={() => {addTag(newTagValue)}}
          >
            Add
          </Button>
        </div>
        <List>
          {
            tags && tags.map((tag, tagIndex) => (
              <ListItem
                key={`${listIndex}_${tag}`}
                onClick={() => {removeTag(tagIndex);}}
                className="list-item"
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText>
                  {tag}
                </ListItemText>
                <Button
                  className="list-item-delete-action"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                    Delete
                  </Button>
              </ListItem>
            ))
          }
        </List>
      </Card>
    );
  }
};

export default ItemList;