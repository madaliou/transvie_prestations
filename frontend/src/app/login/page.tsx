/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Tu peux aussi utiliser un SVG ou un emoji si tu préfères

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion.');
      }

      // Stockage du token dans le localStorage
      localStorage.setItem('token', data.token);

      // Redirection vers la page d'accueil ou tableau de bord
      router.push('/');

    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <main style={styles.container}>
      <img src="/logo.webp" alt="Logo Transvie" style={styles.logo} />
      <h2 style={styles.title}>Se connecter</h2>

      {errorMessage && (
        <div style={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} style={styles.form}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>Mot de passe</label>
        <div style={styles.passwordContainer}>
          <div style={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Entrez votre mot de passe"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" style={styles.button}>Se connecter</button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Pas encore de compte ? <a href="/register" style={{ color: '#007bff' }}>S&apos;inscrire</a>
      </p>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#344767',
    position: 'relative'
  },
  logo: {
    display: 'block',
    margin: '0 auto 20px',
    maxWidth: '150px',
    height: 'auto'
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '15px 20px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '16px',
    textAlign: 'center'
  },

  passwordContainer: {
    position: 'relative'
  },
  togglePassword: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#007bff'
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  input: {
    width: '100%',
    padding: '10px',
    paddingRight: '40px', // pour faire de la place à l’icône
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    color: '#344767'
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '12px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#007bff'
  }
};
