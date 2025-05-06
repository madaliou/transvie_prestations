
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Tu peux aussi utiliser un SVG ou un emoji si tu préfères
import ForgotPassword from '@/components/ForgotPassword';


export default function Login() {
const router = useRouter();
const [confirmPassword, setConfirmPassword] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [showPassword, setShowPassword] = useState(false);
const base_url = process.env.NEXT_PUBLIC_API_URL;

const handleConfirmPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    console.log('bamba est ici _____')
  
    try {
      const res = await fetch(`${base_url}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi de l\'email.');
      }
  
      alert("Un email de réinitialisation a été envoyé si l'adresse est valide.");
      router.push('/login'); // redirection vers login ou page de confirmation
  
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

return (
<main style={styles.container}>
<img src="/logo.webp" alt="Logo Transvie" style={styles.logo} />
<h2 style={styles.title}>Envoie de mail</h2>

{errorMessage && (
<div style={styles.errorMessage}>
{errorMessage}
</div>
)}

<form onSubmit={handleConfirmPassword} style={styles.form}>
<input
id="email"
type="password"
required
placeholder="Nouveau mot de passe"
value={password}
onChange={(e) => setPassword(e.target.value)}
style={styles.input}
/>

<input
id="pass"
type="password"
required
placeholder="Confimer le mot de passe"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
style={styles.input}
/>

<div style={styles.buttonGroup}>
<button type="submit" style={styles.button}>Valider</button>
<button
type="button"
style={{ ...styles.button, backgroundColor: '#ccc', marginLeft: '10px' }}
onClick={() => router.push('/')}
>
Annuler
</button>
</div>
</form>
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
//width: '100%',
padding: '10px',
paddingRight: '40px',
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

