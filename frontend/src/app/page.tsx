/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Select, Form} from 'antd';
const {Option} = Select;
//import Select from "react-select";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [agenceId, setAgenceId] = useState('');
  const [cout, setCout] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agencesList, setAgencesList] = useState<{ id: number; name: string }[]>([]);
  const [userName, setUserName] = useState<string>(''); // Ajouter l'état pour le nom de l'utilisateur
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [healthFacilityTypes, setHealthFacilityTypes] = useState<{ id: number; name: string }[]>([]);
  const [clientId, setClientId] = useState('');
  const [healthFacilityTypeId, setHealthFacilityTypeId] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [otherAct, setOtherAct] = useState('');
  const requiredMark = <span style={{ color: 'red' }}>*</span>;
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  // Trier les clients par ordre alphabétique
const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));

//const selectedClient = clientOptions.find(option => option.value === Number(clientId));

  useEffect(() => {
    // Vérification du token d'authentification
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Redirige l'utilisateur vers la page de login si le token est absent
      router.push('/login');
    }

    // Récupérer le nom de l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
    if (user && user.firstname && user.lastname) {
      setUserName(`${user.firstname} ${user.lastname}`);
    }

    const fetchAgences = async () => {
      const res = await  fetch(`${base_url}/agences`);
      const data = await res.json();
      setAgencesList(data);
    
      // Sélectionner Cotonou par défaut
      const cotonou = data.find((a: any) => a.name.toLowerCase() === 'cotonou');
      if (cotonou) setAgenceId(cotonou.id.toString());
    };
  
    // Fonction pour récupérer les prestations
    const fetchCategoriesAndSubcategories = async () => {
      const res = await fetch(`${base_url}/categories`);
      const data = await res.json();
      setCategoriesList(data);
    };

    // Fonction pour récupérer les prestations
    const fetchClients = async () => {
      const res = await fetch(`${base_url}/clients`);
      const data = await res.json();
      setClients(data);
    };

    // Fonction pour récupérer les prestations
    const fetchHealthFacilityTypes = async () => {
      const res = await fetch(`${base_url}/health-facility-types`);
      const data = await res.json();
      setHealthFacilityTypes(data);
    };
    
    fetchCategoriesAndSubcategories();
    fetchAgences();
    fetchClients();
    fetchHealthFacilityTypes();
  }, [base_url, router]);

  useEffect(() => {
    if (categoryId) {
      const selected = categoriesList.find((cat) => cat.id === parseInt(categoryId));
      setFilteredSubcategories(selected?.subcategories || []);
      setSubCategoryId('');
    }
  }, [categoryId, categoriesList]);

  const handleSubmit = async (e: React.FormEvent) => {
    //e.preventDefault();
  
    const payload = {
      agenceId: parseInt(agenceId),
      actId: parseInt(subCategoryId),
      date,
      otherAct,
      certificateNumber,
      cout: parseFloat(cout),
      clientId: Number(clientId),
      healthFacilityTypeId: Number(healthFacilityTypeId)
    };

    console.log('payload : ', payload)
  
    const token = localStorage.getItem('access_token');
  
    try {
      const res = await fetch(`${base_url}/prestations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setSuccessMessage("🎉 Prestation enregistrée avec succès !");
        toast.success("🎉 Prestation enregistrée avec succès !");
        
        // Reset form fields
        setAgenceId("3");
        setDate('');
        setCout('');
        setCertificateNumber('');
        setOtherAct('');
        setCategoryId('');
        setSubCategoryId('');
      } else {
        const errorMessage = data?.message || 'Une erreur est survenue';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur réseau ou serveur');
    }
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
       {/* Afficher les infos de l'utilisateur */}
       <div style={styles.userInfo}>
        <span>{userName ? `${userName}` : 'Bienvenue'}</span>
      </div>
      <h2 style={styles.title}>Enregistrement de prestation</h2>

      {successMessage && (
        <div style={styles.successMessage}>
          <span>{successMessage}</span>
          <button type="button" style={styles.closeButton} onClick={() => setSuccessMessage('')}>
            ✖
          </button>
        </div>
      )}

      {/* <form onSubmit={handleSubmit} style={styles.form}> */}
      <Form onFinish={handleSubmit} layout="vertical" style={styles.form}>
        <label>Agence {requiredMark}</label>
        <select required value={agenceId} onChange={(e) => setAgenceId(e.target.value)} style={styles.input}>
          <option value="">-- Choisissez une agence --</option>
          {agencesList.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

       <label>Entreprise {requiredMark}</label>
        {/* <Form.Item label={`Entreprise`} name="clientId" rules={[{ required: true, message: 'Veuillez sélectionner une entreprise' }]}> */}
        <Select
          allowClear
          showSearch
          placeholder="Filtrer par entreprise"
          style={{ width: '100%', marginRight: 20, height: '100%' }}
          optionFilterProp="children"
          value={clientId || undefined} 
          onChange={(value) => setClientId(value ?? null)}
          filterOption={(input, option) =>
            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
        >
          {sortedClients.map((client) => (
            <Option key={client.id} value={client.id}>
              {client.name}
            </Option>
          ))}
              </Select>
        {/* </Form.Item> */}

        <label>Type de structure sanitaire {requiredMark}</label>
        <Select
          placeholder="-- Choisissez un type de structure sanitaire --"
          style={{ width: '100%', marginRight: 20, height: '100%' }}
          value={healthFacilityTypeId ? Number(healthFacilityTypeId) : undefined}
          onChange={(value) => setHealthFacilityTypeId(String(value))}
          showSearch
          allowClear
          optionFilterProp="children"
        >
          {healthFacilityTypes.map((a) => (
            <Select.Option key={a.id} value={a.id}>
              {a.name}
            </Select.Option>
          ))}
        </Select>

        <label>Date {requiredMark}</label>
        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />

        <label>Type de service  {requiredMark}</label>
              <Select
        placeholder="Choisissez un service"
        style={{ width: '100%', marginRight: 20, height: '100%' }}
        value={categoryId ? parseInt(categoryId) : undefined}
        onChange={(value) => setCategoryId(value.toString())}
        showSearch
        optionFilterProp="children"
      >
        {categoriesList.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.name}
          </Option>
        ))}
      </Select>

    {categoryId && (
  <>
    <label>Acte {requiredMark}</label>
    <Select
    placeholder="Choisissez un acte"
    style={{ width: '100%', marginRight: 20, height: '100%' }}
    value={subCategoryId ? parseInt(subCategoryId) : undefined}
    onChange={(value) => setSubCategoryId(value.toString())}
    showSearch
    optionFilterProp="children"
  >
    {filteredSubcategories.map((sub) => (
      <Option key={sub.id} value={sub.id}>
        {sub.name}
      </Option>
    ))}
  </Select>
  </>
)}

<label>Ou autre acte (libre)</label>
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

  <label>Numero d&apos;attestation </label>
        <input
          type="number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Enregistrer</button>
        </Form>
      {/* </form> */}

      <div style={styles.linkWrapper}>
      <Link href="/kpi" style={styles.link}>
        Voir les statistiques 👀
      </Link>
    </div>

      <div style={styles.logoutLinkWrapper}>
      <button onClick={handleLogout} style={styles.logoutLink}>
         Se déconnecter 🔓
      </button>
    </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '90%',        // occupe 90% de la largeur de l’écran
    maxWidth: '1000px',   // mais ne dépassera pas 800px
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
    padding: '8px',
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
