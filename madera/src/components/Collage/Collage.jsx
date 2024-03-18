import "./Collage.css";

const Collage = () => {
  return (
    <section className="quote-container">
      <div className="footer-no-i-m-g">
        <div className="quote-section">
          <div className="quote-section-inner">
            <div className="frame-child" />
          </div>
          <img
            className="quote-section-child"
            loading="lazy"
            alt=""
            src="/frame-1271@2x.png"
          />
        </div>
        <img
          className="footer-no-i-m-g-child"
          loading="lazy"
          alt=""
          src="/frame-127-1@2x.png"
        />
      </div>
      <div className="main-sections">
        <img
          className="footer-no-i-m-g-child"
          loading="lazy"
          alt=""
          src="/frame-125@2x.png"
        />
        <div className="frame-group">
          <img
            className="frame-item"
            loading="lazy"
            alt=""
            src="/frame-125-1@2x.png"
          />
          <img
            className="frame-item"
            loading="lazy"
            alt=""
            src="/frame-126@2x.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Collage;
