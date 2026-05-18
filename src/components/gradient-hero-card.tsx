export function GradientHeroCard() {
  return (
    <aside
      className="gradient-hero-card relative overflow-hidden"
      aria-label="Pacific AI Tech setup outcomes"
    >
      <div className="gradient-hero-card__shade absolute inset-0" aria-hidden="true" />

      <div className="gradient-hero-card__content relative">
        <div>
          <p className="gradient-hero-card__label">Typical first month impact</p>
          <p className="gradient-hero-card__headline">
            Built for owners who need working AI, not another tool to study.
          </p>
        </div>

        <div className="gradient-hero-card__stats">
          <div>
            <div className="stat-number">10–20</div>
            <div className="stat-label">hours saved per week</div>
          </div>
          <div>
            <div className="stat-number">1</div>
            <div className="stat-label">session to get running</div>
          </div>
          <div>
            <div className="stat-number">30</div>
            <div className="stat-label">days of premium support</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
