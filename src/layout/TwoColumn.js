import React from 'react'; // No need for '* as React' since you're not using 'React' explicitly.
import { Sidebar } from '../regions';
import { Certification } from '../features/certification';

const TwoColumn = () => {
  return (
    <>
      <div className="container-fluid app-background">
        <div className="two-col row">
          <div className="col-md-3 col-sm-12 col-xs-12 app-col-1">
            <Sidebar />
          </div>
          <div className="col-md-9 col-sm-12 col-xs-12 app-col-2">
            <Certification />
          </div>
        </div>
      </div>
    </>
  );
}

export { TwoColumn };
