/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
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
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#AF19FF', '#FF4560', '#00E396', '#775DD0',
    '#FEB019', '#FF4560', '#00A7E1', '#FF66C3'
  ];

  useEffect(() => {
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
  }, []);

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

  // Calculer les statistiques par acte
  /* const getActStats = () => {
    const actStats = kpis.reduce((acc, kpi) => {
      const act = kpi.act_id;
      acc[act] = acc[act] ? acc[act] + 1 : 1;
      return acc;
    }, {});

    return Object.entries(actStats).map(([act, count]) => ({
      name: `Acte ${act}`,
      value: count
    }));
  }; */

  // Calculer les statistiques par service
  const getServiceStats = () => {
    const serviceStats = kpis.reduce((acc, kpi) => {
      const service = kpi.prestation;
      acc[service] = acc[service] ? acc[service] + 1 : 1;
      return acc;
    }, {});

    return Object.entries(serviceStats).map(([service, count]) => ({
      name: service,
      value: count
    }));
  };

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
      {/* <div style={styles.chartContainer}>
        <Title level={4}>Répartition par Actes</Title>
        <PieChart width={400} height={300}>
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
            {getActStats().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend />
        </PieChart>
      </div> */}

      {/* Graphique pour les statistiques par services */}
      <div style={styles.chartContainer}>
        <Title level={4} style={{marginLeft: 40}}>Répartition par Services</Title>
        <PieChart width={600} height={400}>
          <Pie
            data={getServiceStats()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {getServiceStats().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend verticalAlign="bottom" height={36}/>
</PieChart>
      </div>

     
    </div>
    <Link href="/" style={styles.backLink}>
        ← Retour à la saisie
      </Link>
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
    marginBottom: '30px'
  },
};

export default Kpis;
