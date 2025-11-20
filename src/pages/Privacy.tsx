import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../style/pages/privacy.css";

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="privacy">
      <header className="privacy__header">
        <div onClick={() => navigate(-1)} className="privacy__header-back">
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </div>
        <h1 className="privacy__header-title">Privacy Policy</h1>
      </header>

      <main className="privacy__main">
        <div className="privacy__content">
          <section className="privacy__section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Profile information (avatar, preferences)</li>
              <li>Messages and chat history</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send notifications</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your
              information only in the following circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist our operations</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="privacy__section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </section>

          <section className="privacy__section">
            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="privacy__section privacy__section--footer">
            <p className="privacy__last-updated">
              Last Updated: November 20, 2025
            </p>
            <p className="privacy__contact">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:privacy@yourapp.com">privacy@yourapp.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Privacy;
