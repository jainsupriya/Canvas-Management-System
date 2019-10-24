import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
const options = [
    'Edit',
    'Delete'
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

    handleDelete = () => {
      console.log('in delete')
      this.props.delete();
      this.handleClose();
    };
  handleEdit = () => {
    this.props.edit();
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
            <MenuItem  onClick={this.handleEdit}>
             <Edit/> &nbsp; &nbsp; Edit
            </MenuItem>
            <MenuItem onClick={this.handleDelete}>
             <Delete/>&nbsp; &nbsp; Delete
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
            <Close/> &nbsp; &nbsp; Close
            </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default LongMenu;


/*
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}*/