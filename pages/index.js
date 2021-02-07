import "bootstrap/dist/css/bootstrap.css";
import React from 'react'
import Head from 'next/head'
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faUpload as fasUpload, faPlay as fasPlay, faDownload as fasDownload, faClock as fasClock } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { data } from '../data/data.js'
import useSWR, { mutate } from 'swr'
import { default as NumberFormat } from 'react-number-format';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  return (
    <>
      <Head>
        <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <div data-netlify-identity-menu></div>
      </Head>
      <div className="component-container p-4">
        <div className="center-panel">
          <h3>
            <FontAwesomeIcon icon={fasHome} />
            &nbsp;Roommate match app</h3>
          <Row>
            {data.map((room) => {
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
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home
