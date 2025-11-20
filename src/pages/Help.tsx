import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../style/pages/help.css";

function Help() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.warn("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    try {
      setLoading(true);

      // Тут можна додати API call для відправки листа
      // await sendEmail({ name, email, subject, message });

      // Симуляція відправки
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      // Очищення форми
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="help">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <header className="help__header">
        <div onClick={() => navigate(-1)} className="help__header-back">
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </div>
        <h1 className="help__header-title">Help & Support</h1>
      </header>

      <main className="help__main">
        <div className="help__content">
          <div className="help__intro">
            <EmailIcon
              sx={{ fontSize: 48, color: "var(--brand-color-dark-mode)" }}
            />
            <h2>How can we help you?</h2>
            <p>
              Have a question or need assistance? Fill out the form below and
              our support team will get back to you as soon as possible.
            </p>
          </div>

          <form className="help__form" onSubmit={handleSubmit}>
            <div className="help__form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                className="help__input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="help__form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="help__input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="help__form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                className="help__input"
                placeholder="What is your question about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="help__form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="help__textarea"
                placeholder="Please describe your issue or question in detail..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className="help__submit" disabled={loading}>
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <SendIcon sx={{ fontSize: 20, marginRight: "8px" }} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="help__faq">
            <h3>Frequently Asked Questions</h3>
            <div className="help__faq-item">
              <h4>How do I reset my password?</h4>
              <p>
                You can reset your password from the login page by clicking
                "Forgot Password" link.
              </p>
            </div>
            <div className="help__faq-item">
              <h4>How do I delete my account?</h4>
              <p>
                Go to Account Settings and scroll down to find the "Delete
                Account" option.
              </p>
            </div>
            <div className="help__faq-item">
              <h4>Is my data secure?</h4>
              <p>
                Yes, we use industry-standard encryption to protect your data.
                Read our Privacy Policy for more details.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Help;
