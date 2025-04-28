/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Form, Input, Button, Select } from 'antd';

export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [agencesList, setAgencesList] = useState<{ id: number; name: string }[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const base_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const res = await fetch(`${base_url}/agences`);
        const data = await res.json();
        setAgencesList(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des agences:', err);
      }
    };
    fetchAgences();
  }, [base_url]);

  const handleRegister = async (values: any) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`${base_url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de l’inscription.');
      }

      setSuccessMessage('🎉 Compte créé avec succès !');
      form.resetFields();

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <main style={styles.container}>
      <img src="/logo.webp" alt="Logo Transvie" style={styles.logo} />
      <h2 style={styles.title}>Créer un compte</h2>

      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        style={styles.form}
      >
        <Form.Item
  label="Agence"
  name="agenceId"
  rules={[{ required: true, message: "Veuillez sélectionner une agence." }]}
  style={{ marginBottom: 0 }}
>
  <Select
    placeholder="Sélectionnez une agence"
    showSearch
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
    }
  >
    {agencesList.map((agence) => (
      <Select.Option key={agence.id} value={agence.id}>
        {agence.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>


        <Form.Item
          label="Prénom"
          name="firstname"
          rules={[{ required: true, message: "Veuillez entrer votre prénom." }]}
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="Entrez votre prénom" />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastname"
          rules={[{ required: true, message: "Veuillez entrer votre nom." }]}
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="Entrez votre nom" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Veuillez entrer votre email." },
            { type: 'email', message: "Veuillez entrer un email valide." },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="Entrez votre email" />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Veuillez entrer votre mot de passe." }]}
        >
          <div style={styles.passwordContainer}>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Entrez votre mot de passe"
              suffix={
                <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              }
            />
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block style={styles.button}>
            S’inscrire
          </Button>
        </Form.Item>
      </Form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Déjà un compte ? <a href="/login" style={{ color: '#007bff' }}>Connexion</a>
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
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px 20px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '16px',
    textAlign: 'center'
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
  eyeIcon: {
    cursor: 'pointer',
    color: '#007bff'
  }
};
