import React, { useState } from 'react';
import { Sidebar } from '../regions';
import { Certification } from '../features/certification';

const TwoColumn = () => {
  const [showCertification, setShowCertification] = useState(false);

  return (
    <>
      <div className="container-fluid app-background">
        <div className="two-col row">
          <div className="col-md-3 col-sm-12 col-xs-12 app-col-1">
            <Sidebar setShowCertification={setShowCertification} />
          </div>
          <div className="col-md-9 col-sm-12 col-xs-12 app-col-2">
            {showCertification && <Certification />}
          </div>
        </div>
      </div>
    </>
  );
}

export { TwoColumn };