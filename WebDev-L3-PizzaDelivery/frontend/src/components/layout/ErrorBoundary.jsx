import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #ff4444, #ff9800)', color: 'white', textAlign: 'center', padding: '20px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Oops! Something went wrong in the kitchen</h1>
          <p style={{ fontSize: '20px', maxWidth: '600px' }}>We dropped a pizza box, but our chefs are cleaning it up. Please refresh the page to try again.</p>
          <p style={{ fontSize: '14px', maxWidth: '800px', background: 'rgba(0,0,0,0.5)', padding: '10px', marginTop: '20px' }}>
             {this.state.error?.toString()}<br/>
             {this.state.errorInfo?.componentStack}
          </p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '30px', padding: '15px 30px', background: 'white', color: '#ff4444', border: 'none', borderRadius: '50px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>Refresh Kitchen</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
