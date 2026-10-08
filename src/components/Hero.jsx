import TopographyCanvas from "./TopographyCanvas.jsx";
import { profile } from "../data.js";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__sky" aria-hidden="true">
        <TopographyCanvas />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__content" data-parallax="0.16">
        <p className="hero__location">
          <span className="hero__pin" aria-hidden="true">
            <svg viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="2.4" fill="currentColor" />
              <circle cx="6" cy="6" r="5.2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
            </svg>
          </span>
          Based in {profile.location}
        </p>
        <h1 className="hero__title">
          <span className="hero__line">Stavros</span>
          <span className="hero__line">Antoniou</span>
        </h1>
        <p className="hero__headline">{profile.headline}</p>
        <p className="hero__coords" aria-label="Map coordinates of Heraklion">
          {profile.coordinates.lat}&ensp;/&ensp;{profile.coordinates.lng}
        </p>
      </div>
      <div className="hero__scrollcue" aria-hidden="true">
        <span className="hero__scrollcue-label">Scroll</span>
        <span className="hero__scrollcue-line" />
      </div>
    </section>
  );
}
