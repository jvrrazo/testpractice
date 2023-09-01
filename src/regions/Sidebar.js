import {CertificationList} from '../features/certification';

function Sidebar({ setShowCertification }) {
  return (
    <div className="sidebar w-100 h-100">
      <div className="sidebar-nav">
        <CertificationList setShowCertification={setShowCertification} />
      </div>
    </div>
  );
}

export { Sidebar };
