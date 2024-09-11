// NotFoundPage.js

function NotFoundPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
            <h1 style={{ color: '#6c757d', fontSize: '3rem' }}>404</h1>
            <p style={{ color: '#6c757d', fontSize: '2rem' }}>Page not found</p>
            <p style={{ color: '#6c757d' }}>The page you're looking for doesn't exist.</p>
            <a href="/homepage" style={{ color: '#007bff', textDecoration: 'none', marginTop: '1rem', padding: '0.5rem 1rem', border: '1px solid #007bff', borderRadius: '5px' }}>Go back to the home page</a>
        </div>
    );
}

export default NotFoundPage;