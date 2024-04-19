import Image from "next/image";
import Link from 'next/link';

const AgeVerification = ({open, onClose}) => {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="modal-content text-black py-4 px-3">
          <div className="modal-body">
            <div className="container-fluid text-center m-auto">
              <Image src="/images/no-booze-logo.png" className="" width={150} height={150} alt=""/>
              <h3 className="py-5">Must Be 21 to Purchase These Products</h3>
              <div className="row">
                <div className="col-6 d-grid">
                  <button 
                    type="button" 
                    className="btn btn-primary light"
                    onClick={onClose}
                  >
                    Yes I'm 21
                  </button>
                </div>
                <div className="col-6 d-grid">
                  <Link
                    href="https://www.google.com/"
                    type="button"
                    className="btn btn-primary"
                  >
                    No I'm Not 21
                  </Link>      
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgeVerification;