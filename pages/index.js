import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faUpload as fasUpload, faPlay as fasPlay, faDownload as fasDownload, faClock as fasClock } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { data } from '../data/data.js'
import { default as NumberFormat } from 'react-number-format';
import netlifyIdentity from 'netlify-identity-widget';

const Home = () => {
  const [userEmail, setUserEmail] = useState('');
  const [widgetInitialized, setWidgetInitialized] = useState(false);
  
  useEffect(() => {
    if (!widgetInitialized) {
      netlifyIdentity.on('init', () => {
        setUserEmail(netlifyIdentity.currentUser()?.email)
      })
      netlifyIdentity.on('login', () => {
        setUserEmail(netlifyIdentity.currentUser()?.email)
      })
      netlifyIdentity.on('logout', () => {
        setUserEmail('')
      })
      netlifyIdentity.init();
      setWidgetInitialized(true)
    }
  })
 
  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <h3>
            <FontAwesomeIcon icon={fasHome} />
            &nbsp;Roommate match app</h3>
          <Row>
            {data.map((room) => {
              let uploadButton;
              let playButton;
              let requestButton;
              let pendingRequestButton;
              let approvedRequestButton;
              
              if (userEmail === room.owner) {
                uploadButton = 
                <span>
                  <button 
                  name="upload_widget" 
                  className="btn btn-primary btn-sm"
                  ><FontAwesomeIcon icon={fasUpload} />&nbsp;Upload Video</button>
                  &nbsp;
                </span>;
              } 
              
              if (room.videoId && userEmail === room.owner) {
                playButton = 
                <span>
                  <Button 
                  href={`/play-video/${room.number}`}
                  target="_blank" size="sm" className="btn-success"><FontAwesomeIcon icon={fasPlay} />&nbsp;Play Video
                  </Button>
                  &nbsp;
                </span>;
              }
              
              if (room.videoId && userEmail && userEmail != room.owner
                && (!room.pendingRequests
                  || room.pendingRequests
                  .filter(e => e.login === userEmail).length === 0)
                  && (!room.approvedRequests
                    || room.approvedRequests
                    .filter(e => e && (e.login == userEmail)).length == 0)) {
                      requestButton = 
                      <span>
                  <Button size="sm" className="btn-warning"
                    >
                    <FontAwesomeIcon icon={fasDownload} />&nbsp;Request Video
                  </Button>
                  &nbsp;
                </span>;
              }
              
              if (room.videoId && userEmail && userEmail != room.owner
                && room.pendingRequests
                && room.pendingRequests
                .filter(e => e.login == userEmail).length > 0) {                
                  pendingRequestButton = 
                  <span>
                  <Button size="sm" className="btn-warning" disabled>
                    <FontAwesomeIcon icon={fasClock} />&nbsp;Request Pending
                  </Button>
                  &nbsp;
                </span>;
              }
              
              if (room.videoId && userEmail && userEmail != room.owner
                && room.approvedRequests
                && room.approvedRequests
                .filter(e => e && (e.login == userEmail)).length > 0) {                
                approvedRequestButton = 
                <span>
                  <Button target="_blank" size="sm" className="btn-success"
                  href={`/play-video/${room.$loki}`}>
                    <FontAwesomeIcon icon={fasPlay} />&nbsp;Watch Video
                  </Button>
                  &nbsp;
                </span>;
              }
              
              return (
                <Col key={room.number} id="hits" className="col-xs-12 col-sm-6 col-md-4 p-3">
                  <Card className="shadow">
                    <img src={room.pic} className="card-img-top img-estate" />
                    <Card.Body>
                      <h5 className="card-title">
                        <NumberFormat value={room.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        &nbsp; /&nbsp; week
                        <FontAwesomeIcon icon={farHeart} className="text-danger float-right" />
                      </h5>
                      <Card.Text><b>{room.address}</b></Card.Text>
                      <Card.Text><b>owner: {room.owner}</b></Card.Text>
                      <Card.Text><b>userEmail: {userEmail}</b></Card.Text>
                      <Card.Text className="description" title="{realEstate.description}">
                        <b>
                          <FontAwesomeIcon icon={fasBed} />
                          <span>&nbsp;{room.bedrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasBath} />
                          <span>&nbsp;{room.bathrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasCar} />
                          <span>&nbsp;{room.cars}&nbsp;</span>
                        </b>
                      </Card.Text>
                      <Row>
                        {uploadButton}
                        {playButton}
                        {requestButton}
                        {pendingRequestButton}
                        {approvedRequestButton}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export default Home
