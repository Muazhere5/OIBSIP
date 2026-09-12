import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1a0f0a, #3b1c0a)', color: 'white', textAlign: 'center', padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
          <div style={{ fontSize: '100px', marginBottom: '10px', animation: 'spin-bounce 2s infinite' }}>??</div>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', color: '#ffca28' }}>Oops! System Baked Too Long...</h1>
          <p style={{ fontSize: '20px', maxWidth: '600px', color: '#ccc' }}>A critical error occurred while preparing your request. The pizza fell out of the oven.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '30px', padding: '15px 30px', fontSize: '20px', backgroundColor: '#e65c00', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(230, 92, 0, 0.4)' }}>Reheat Application</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
