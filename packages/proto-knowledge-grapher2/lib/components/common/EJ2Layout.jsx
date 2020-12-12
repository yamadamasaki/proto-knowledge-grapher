import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

const EJ2Layout = ({currentUser, children }) =>

  <div className={classNames('wrapper')} id="wrapper">

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-icons/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-inputs/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-lists/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-popups/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-richtexteditor/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-navigations/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-layouts/styles/material.css" rel="stylesheet" />
      <link href="//cdn.syncfusion.com/ej2/ej2-dropdowns/styles/material.css" rel="stylesheet" />
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

registerComponent({ name: 'EJ2Layout', component: EJ2Layout, hocs: [withCurrentUser] });
