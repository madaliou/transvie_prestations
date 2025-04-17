/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Table, Typography, Tooltip, Button, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import Link from 'next/link';
import { PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts'; // Importation de recharts

const { Title } = Typography;

const Kpis = () => {
  const [kpis, setKpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#AF19FF', '#FF4560', '#00E396', '#775DD0',
    '#FEB019', '#FF4560', '#00A7E1', '#FF66C3'
  ];

  /* useEffect(() => {
    const fetchKpis = async () => {
      try {
        const res = await fetch(`${base_url}/kpis`);
        const data = await res.json();
        setKpis(data);
      } catch (err) {
        console.error('Erreur de chargement des KPIs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []); */

  // 1. Récupère KPIs et catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${base_url}/kpis`),
          fetch(`${base_url}/subcategories`)
        ]);
        const [dataKpis, dataCats] = await Promise.all([res1.json(), res2.json()]);
        setKpis(dataKpis);
        setCategories(dataCats);
      } catch (err) {
        console.error('Erreur de chargement des KPIs ou catégories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Construis le mapping act_id → category_name
  const actIdToCategory = useMemo(() => {
    const map: Record<number,string> = {};
    categories.forEach((cat: any) => {
      cat.subcategories.forEach((sub: any) => {
        map[sub.id] = cat.category_name;
      });
    });
    return map;
  }, [categories]);

  // 3. Groupes pour les charts
  const getActStats = () => {
    const stats: Record<string, number> = {};
    kpis.forEach(kpi => {
      const name = kpi.prestation || 'Inconnu';
      stats[name] = (stats[name] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };

  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    kpis.forEach(kpi => {
      const catName = actIdToCategory[kpi.act_id] || 'Inconnu';
      stats[catName] = (stats[catName] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };


  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleExportCSV = () => {
    const csvData = filteredData.map(kpi => ({
      Agence: kpi.agence,
      Prestation: kpi.prestation,
      Date: formatDateTime(kpi.date),
      Coût: kpi.cout,
      Autre: kpi.other_act,
      NuméroAttestation: kpi.certificate_number
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'kpis.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = kpis.filter((item) =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Agence',
      dataIndex: 'agence',
      key: 'agence',
      sorter: (a: any, b: any) => a.agence.localeCompare(b.agence),
    },
    {
      title: 'Prestation',
      dataIndex: 'prestation',
      key: 'prestation',
      render: (text: string) =>
        text.length > 40 ? (
          <Tooltip title={text}>
            {text.slice(0, 20)}...{text.slice(-15)}
          </Tooltip>
        ) : (
          text
        ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => formatDateTime(date),
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Coût (F CFA)',
      dataIndex: 'cout',
      key: 'cout',
      render: (value: number) => value ?? '-',
      align: 'right' as const,
    },
    {
      title: "Numero d'attestation",
      dataIndex: 'certificate_number',
      key: 'certificate_number',
      render: (value: number) => value ?? '-',
      align: 'right' as const,
    }
  ];

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>Statistiques des Prestations</Title>

      <div style={styles.actions}>
        <Input
          placeholder="🔍 Rechercher..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleExportCSV}
        >
          Exporter en CSV
        </Button>
      </div>
      {/* Tableau des données */}
      <Table
        columns={columns}
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
      />

<div style={styles.chartRow}>
      {/* Graphique pour les statistiques par actes */}
      <div style={styles.chartContainer}>
        <Title level={4}>Répartition par Actes</Title>
        <PieChart width={400} height={400}>
          <Pie
            data={getActStats()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {getActStats().map((_, idx) => (
                <Cell key={idx} fill={COLORS[(idx+4) % COLORS.length]} />
              ))}
          </Pie>
          <RechartsTooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Graphique pour les statistiques par services */}
      <div style={styles.chartContainer}>
        <Title level={4} style={{marginLeft: 40}}>Répartition par services</Title>
        <PieChart width={400} height={400}>
        <Pie
              data={getCategoryStats()}
              dataKey="value"
              nameKey="name"
              cx="50%" cy="50%"
              outerRadius={100}
              label
            >
              {getCategoryStats().map((_, idx) => (
                <Cell key={idx} fill={COLORS[(idx+4) % COLORS.length]} />
              ))}
            </Pie>
          <RechartsTooltip />
          <Legend verticalAlign="bottom" height={36}/>
</PieChart>
      </div>

     
    </div>
    <div style={{marginTop: "50px"}}>
    <Link href="/" style={styles.backLink}>
        ← Retour à la saisie
      </Link>
    </div>
    
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '30px',
    margin: '40px auto',
    padding: '30px',
    maxWidth: '1100px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.05)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '30px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchInput: {
    width: 300,
    borderRadius: 6,
  },
  backLink: {
    marginBottom: '10px',
    paddingLeft: '0',
    fontSize: '16px',
    color: '#1890ff',
    fontWeight: 'bold',
    marginTop: '40px'
  },
  chartRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '40px',
  },
  
  chartContainer: {
    flex: 1,
    minWidth: '300px',   // taille minimale pour forcer le wrap sur mobile
    //textAlign: 'center',
    //marginBottom: '30px'
  },
};

export default Kpis;
