import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';

import { setActive } from '../reducer/Reducer';
import { startExam } from '../../exam/reducer/Reducer';
import certifications from '../../../data/certifications.json';
import './App.css';  // Import your custom SASS file

function CertificationList({ setShowCertification }) {
  const [selectedNav, setSelectedNav] = useState(''); // Added
  const activeCertificate = useSelector(state => state.certificate.active);
  const dispatch = useDispatch();
  let activeNav = activeCertificate.href ? activeCertificate.href : '';

  if (activeNav === '') {
    const defaultCertKey = process.env.REACT_APP_DEFAULT_CERT ? process.env.REACT_APP_DEFAULT_CERT : 'certified_cloud_practitioner_test';
    dispatch(setActive(certifications[defaultCertKey]));
    activeNav = defaultCertKey;
  }

  const setSelectedCertification = (selectedByUser) => {
    dispatch(startExam({ action: false, total: 0 }));
    dispatch(setActive(certifications[selectedByUser]));
    setShowCertification(true); // Added
    setSelectedNav(selectedByUser); // Added
  }

  return (
    <div className="pt-2 pb-2">
      <Nav className='nav-links-container' variant="pills" activeKey={activeNav}>
        <div>
          <p className="small text-muted">
            Please select a certification from below to start the practice exam.
          </p>
        </div>
        {Object.keys(certifications).map(index => (
          <Nav.Item
            key={index}
            className={`text-center w-100 ${selectedNav === index ? 'clicked' : ''}`}
            onClick={() => setSelectedCertification(index)}
          >
            <Nav.Link href={certifications[index].href}>
              <span>{certifications[index].title}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export { CertificationList };