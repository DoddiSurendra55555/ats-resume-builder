import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import styles from './Home.module.css';

const Home = () => {
    // Pull the theme state and toggle function from our global context
    const { theme, toggleTheme } = useAppContext();

    return (
        <div style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: 0, padding: 0, backgroundColor: 'var(--bg-primary)' }}>
            
            {/* Top Navigation Bar */}
            <nav className={styles.navbar}>
                <Link to="/" className={styles.brand}>ATS Builder.</Link>
                <div className={styles.navLinks}>
                    <a href="#features" className={styles.navLink}>How it Works</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    
                    {/* NEW: The Theme Toggle Button */}
                    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <Link to="/app" className={styles.navBtn}>Go to App</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Land Your Dream Job with AI
                </h1>
                <p className={styles.heroSubtitle}>
                    Stop guessing what the Applicant Tracking System wants. Our Gemini 2.5-powered builder tailors your resume to the exact job description in seconds.
                </p>
                <Link to="/app" className={styles.ctaBtn}>
                    Build Your Resume Now
                </Link>
            </header>

            {/* Features / How It Works Section */}
            <section id="features" className={styles.features}>
                <h2 className={styles.sectionTitle}>How It Works</h2>
                
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.icon}>📝</div>
                        <h3 className={styles.cardTitle}>1. Provide Your Data</h3>
                        <p className={styles.cardText}>
                            Drop in your base experience, projects, and education. We handle the heavy lifting of organizing and mapping your technical skills.
                        </p>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.icon}>🎯</div>
                        <h3 className={styles.cardTitle}>2. Paste the Job Link</h3>
                        <p className={styles.cardText}>
                            Paste the target job description. Our AI analyzes the core keywords, required technologies, and formats your experience to achieve an 80-90% ATS match rate.
                        </p>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.icon}>🤖</div>
                        <h3 className={styles.cardTitle}>3. Live AI Co-Pilot</h3>
                        <p className={styles.cardText}>
                            Edit the generated document in real-time. Chat with our AI Co-Pilot to adjust tone, rewrite bullet points, and instantly download a perfectly formatted PDF.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Professional Footer */}
            <footer id="about" className={styles.footer}>
                <div className={styles.footerGrid}>
                    
                    {/* About Us Column */}
                    <div>
                        <h3 className={styles.footerHeading}>About ATS Builder</h3>
                        <p className={styles.footerText}>
                            We build intelligent workflows to solve modern career challenges. By leveraging state-of-the-art Large Language Models, we help students and professionals bypass flawed automated screening systems and get their skills in front of real human recruiters.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className={styles.footerHeading}>Product</h3>
                        <Link to="/app" className={styles.footerLink}>Resume Builder App</Link>
                        <a href="#features" className={styles.footerLink}>Feature Overview</a>
                        <Link to="/app" className={styles.footerLink}>Interview Prep AI</Link>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className={styles.footerHeading}>Contact Us</h3>
                        <p className={styles.footerText}>
                            Have questions, feature requests, or need technical support? We'd love to hear from you.
                        </p>
                        <p className={styles.footerText}>
                            Email us at: <br />
                            <a href="mailto:dsuri8788@gmail.com" className={styles.contactLink}>
                                dsuri8788@gmail.com
                            </a>
                        </p>
                    </div>

                </div>

                {/* Copyright Line */}
                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} ATS Resume Builder. Designed by Doddi Surendra.</p>
                </div>
            </footer>

        </div>
    );
};

export default Home;