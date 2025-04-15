'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [agenceId, setAgenceId] = useState('');
  const [cout, setCout] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agencesList, setAgencesList] = useState<{ id: number; name: string }[]>([]);
  const [userName, setUserName] = useState<string>(''); // Ajouter l'état pour le nom de l'utilisateur
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [otherAct, setOtherAct] = useState('');
  const requiredMark = <span style={{ color: 'red' }}>*</span>;

  useEffect(() => {
    // Vérification du token d'authentification
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirige l'utilisateur vers la page de login si le token est absent
      router.push('/login');
    }

    // Récupérer le nom de l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Supposons que le nom et prénom de l'utilisateur soient stockés sous la clé 'user'
    if (user && user.firstName && user.lastName) {
      setUserName(`${user.firstName} ${user.lastName}`);
    }

    const fetchAgences = async () => {
      const res = await fetch('http://localhost:3001/api/agences');
      const data = await res.json();
      setAgencesList(data);
    
      // Sélectionner Cotonou par défaut
      const cotonou = data.find((a: any) => a.name.toLowerCase() === 'cotonou');
      if (cotonou) setAgenceId(cotonou.id.toString());
    };
  
    // Fonction pour récupérer les prestations
    const fetchCategoriesAndSubcategories = async () => {
      const res = await fetch('http://localhost:3001/api/subcategories');
      const data = await res.json();
      setCategoriesList(data);
    };
    
    fetchCategoriesAndSubcategories();
    fetchAgences();
  }, [router]);

  useEffect(() => {
    if (categoryId) {
      const selected = categoriesList.find((cat) => cat.category_id === parseInt(categoryId));
      setFilteredSubcategories(selected?.subcategories || []);
      setSubCategoryId('');
    }
  }, [categoryId, categoriesList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      agenceId: parseInt(agenceId),
      actId: parseInt(subCategoryId),
      date,
      otherAct,
      cout: parseFloat(cout)
    };
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/api/prestations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.message) {
      setSuccessMessage("🎉 Prestation enregistrée avec succès !");
    }

    setAgenceId("3");
    setDate('');
    setCout('');
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Supprimer les informations de l'utilisateur
    router.push('/login');
  };

  return (
    <main style={styles.container}>
      <img src="/logo.webp" alt="Logo Transvie" style={styles.logo} />
      <h2 style={styles.title}>Enregistrement de prestation</h2>

      {successMessage && (
        <div style={styles.successMessage}>
          <span>{successMessage}</span>
          <button type="button" style={styles.closeButton} onClick={() => setSuccessMessage('')}>
            ✖
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Agence {requiredMark}</label>
        <select required value={agenceId} onChange={(e) => setAgenceId(e.target.value)} style={styles.input}>
          <option value="">-- Choisissez une agence --</option>
          {agencesList.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <label>Date {requiredMark}</label>
        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />

        <label>Type de prestation  {requiredMark}</label>
    <select
      required
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
      style={styles.input}
    >
      <option value="">-- Choisissez une catégorie --</option>
      {categoriesList.map((cat) => (
        <option key={cat.category_id} value={cat.category_id}>
          {cat.category_name}
        </option>
      ))}
    </select>

    {categoryId && (
  <>
    <label>Prestation  {requiredMark}</label>
    <select
      required
      value={subCategoryId}
      onChange={(e) => setSubCategoryId(e.target.value)}
      style={styles.input}
    >
      <option value="">-- Choisissez une sous-catégorie --</option>
      {filteredSubcategories.map((sub) => (
        <option key={sub.id} value={sub.id}>
          {sub.name}
        </option>
      ))}
    </select>
  </>
)}

<label>Ou autre prestation (libre)</label>
    <input
      type="text"
      placeholder="Nom de la prestation libre"
      value={otherAct}
      onChange={(e) => setOtherAct(e.target.value)}
      style={styles.input}
    />

        <label>Coût (FCFA)  {requiredMark}</label>
        <input
          type="number"
          required
          value={cout}
          onChange={(e) => setCout(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Enregistrer</button>
      </form>

      <div style={styles.linkWrapper}>
      <Link href="/kpi" style={styles.link}>
        Voir les statistiques
      </Link>
    </div>

      <div style={styles.logoutLinkWrapper}>
      <button onClick={handleLogout} style={styles.logoutLink}>
        🔓 Se déconnecter
      </button>
    </div>
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
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    color: '#344767'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '20px' 
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px 20px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '16px',
    textAlign: 'center',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#155724',
    cursor: 'pointer'
  },
  kpiButton: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  logoutButton: {
    padding: '12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  userInfo: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#344767'
  },
  linkWrapper: {
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'center'
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  logoutLinkWrapper: {
    marginTop: '30px',
    textAlign: 'center'
  },
  logoutLink: {
    background: 'none',
    border: 'none',
    color: '#dc3545',
    textDecoration: 'underline',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};
