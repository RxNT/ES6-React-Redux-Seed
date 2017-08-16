import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, isValid } from 'redux-form';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as addActions from './actions';
import SpinnerComponent from '../../uicomponents/spinner/spinner.component';
import './add-master.component.scss';

const errorImg = require('../../../assets/images/error.png');

const inputComponent = field =>
  <span>
    <input {...field.input}
      type={field.type}
      ref={field.ref}
      style={field.style}
      checked={field.checked}
      disabled={field.disabled}
      placeholder={field.placeholder}
      onChange={field.onChange ? field.onChange : field.input.onChange}
      value={field.prefillValue ? field.prefillValue : field.input.value}
      maxLength = {field.maxLength}/>
    {field.isSubmitted && field.meta.error !== '' && field.meta.error !== undefined &&
    <span>
      <OverlayTrigger placement="top"
        overlay={<Tooltip id={field.meta.error}>{field.meta.error}</Tooltip>}>
        <img src={errorImg} />
      </OverlayTrigger>
    </span>}
  </span>;

class AddMasterComponent extends Component {
  constructor(props) {
    super(props);
    this.saveInfo = this.saveInfo.bind(this);
  }

  componentWillMount() {}

  saveInfo(e) {
    e.preventDefault();
    this.props.actions.saveInfo();
    // if (this.props.formValid) {
    //   alert(JSON.stringify(this.props.formValues));
    // }
  }

  render() {
    let errorMsgs = '';
    if (this.props.validationMessages !== null && this.props.validationMessages !== '' &&
         this.props.validationMessages !== undefined && this.props.validationMessages.length > 0) {
      errorMsgs = this.props.validationMessages.join(' ');
    }

    return (
      <div>
        <div className="table">
          <div className="row">
            <div className="col-md-4">
              <h4>Add Patients</h4>
            </div>
          </div>
        </div>
        <div className="table tab-content">
          {this.props.loading && <SpinnerComponent/>}
          {errorMsgs.length > 0 && <div className="row redBorderTxt wordWrap">{errorMsgs}</div>}
          <div className="row">
            <div className="col-md-1 col-sm-1 col-sx-1">
              First Name:
            </div>
            <div className="col-md-2 col-sm-2 col-sx-2">
              <Field type="text" name="userName"
                isSubmitted={this.props.isSubmitted} component={inputComponent}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 col-sm-1 col-sx-1">
              Email:
            </div>
            <div className="col-md-2 col-sm-2 col-sx-2">
              <Field type="text" name="email"
                isSubmitted={this.props.isSubmitted} component={inputComponent}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 tdTopAlign">
              <div className="pull-right mainHeaderButtons">
                <Link to="/search"><input type="button"
                  className="btnAllYellow pull-right" value="Cancel" /></Link>
                <input type="button" className="btnAllGreen pull-right"
                  value="Save" onClick={this.saveInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.userName || values.userName === '' || values.userName === null) {
    errors.userName = 'First Name is required.';
  }

  if (!values.email || values.email === '' || values.email === null || values.email === undefined) {
    errors.email = 'Email is required.';
  } else {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(values.email)) {
      errors.email = 'Email is invalid.';
    }
  }

  return errors;
}

AddMasterComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  validationMessages: PropTypes.array,
  isSubmitted: PropTypes.bool,
  formValues: PropTypes.object,
  formValid: PropTypes.bool,
};

const mapStateToProps = store => (
  {
    data: store.addMasterReducer.data,
    loading: store.addMasterReducer.loading,
    isSubmitted: store.addMasterReducer.isSubmitted,
    formValid: isValid('frmAddMaster')(store),
    formValues: getFormValues('frmAddMaster')(store),
  }
);

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(addActions, dispatch),
  };
}

const AddMasterComponentForm = reduxForm({
  form: 'frmAddMaster',
  validate,
  enableReinitialize: true,
})(AddMasterComponent);

export default connect(mapStateToProps, mapDispatchToProps)(AddMasterComponentForm);