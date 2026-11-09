import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">ABOUT SPENDWISE</span>

          <h1>Take control of your money with confidence.</h1>

          <p>
            SpendWise is a personal finance management app that helps
            you understand your money by organizing income, expenses,
            and budgets in one place.
          </p>

          <Link to="/Transactions" className="about-link">
            Explore Transactions
          </Link>
        </div>

        <div className="about-hero-card">
          <span className="about-card-label">THE SPENDWISE APPROACH</span>

          <h2>Know where your money goes.</h2>

          <p>
            Track your activity, set spending limits, and make
            more informed financial decisions.
          </p>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="about-mission">
        <div className="about-section-heading">
          <span className="about-eyebrow">OUR PURPOSE</span>
          <h2>Making money management simpler.</h2>
        </div>

        <p>
          Managing personal finances can feel complicated.
          SpendWise brings important financial information together
          so users can monitor spending, plan budgets, and understand
          their available balance without unnecessary complexity.
        </p>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT WE OFFER</span>
          <h2>Tools to support better decisions.</h2>
        </div>

        <div className="about-feature-grid">

          <div className="about-feature-card">
            <span>01</span>
            <h3>Track Transactions</h3>
            <p>
              Record and manage your income and expenses
              to understand your financial activity.
            </p>
          </div>

          <div className="about-feature-card">
            <span>02</span>
            <h3>Manage Budgets</h3>
            <p>
              Set spending limits for different categories
              and monitor your monthly spending.
            </p>
          </div>

          <div className="about-feature-card">
            <span>03</span>
            <h3>Financial Planning</h3>
            <p>
              Check whether a purchase fits your available
              balance before making a spending decision.
            </p>
          </div>

          <div className="about-feature-card">
            <span>04</span>
            <h3>Monitor Your Finances</h3>
            <p>
              View your balance, income, and expenses
              through a simple dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom Section */}
      <section className="about-bottom">
        <h2>Start with a clearer view of your finances.</h2>

        <p>
          Explore your dashboard and keep your financial
          activity organized.
        </p>

        <Link to="/" className="about-link">
          Go to Dashboard
        </Link>
      </section>

    </div>
  );
};

export default About;