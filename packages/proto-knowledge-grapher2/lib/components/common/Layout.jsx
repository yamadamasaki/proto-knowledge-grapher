import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

const Layout = ({currentUser, children }) =>

  <div className={classNames('wrapper')} id="wrapper">

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-react-navigations/styles/material.css" rel="stylesheet" />
    </Helmet>
   
    <Components.HeadTags />

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <Components.Header />
  
    <div className="main">

      <Components.FlashMessages />

      {children}

    </div>
  
    <Components.Footer />
  
  </div>

registerComponent({ name: 'Layout', component: Layout, hocs: [withCurrentUser] });