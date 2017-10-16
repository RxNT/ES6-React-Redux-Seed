import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

/**
 * @args: [options]
 */
class MuiCheckbox extends Component {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.options[1],
    };

    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * 
   */
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.input.onChange(event.target.value);
  }
  /**
   * 
   */
  render() {
    const { classes, options, style, input, meta, ...custom } = this.props;
    return (
      <div>
        {options.map(option => (
          <FormControlLabel key={option}
            control={
              <Checkbox
                checked = {this.state.value === option}
                onClick= {this.handleChange}
                className={classes.checked}
                {...input}
                value={option}
                {...custom}
              />
            }
            label={option}
          />
        ))}
      </div>
    );
  }
}

const styles = {
  checked: {
    margin: 1,
  },
};

MuiCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(MuiCheckbox);
