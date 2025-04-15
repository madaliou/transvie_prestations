'use client';

import React, { useState, useEffect } from 'react';
import { Table, Typography, Tooltip, Button, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const { Title } = Typography;

const Kpis = () => {
  const [kpis, setKpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/kpis');
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExportCSV = () => {
    const csvData = filteredData.map(kpi => ({
      Agence: kpi.agence,
      Prestation: kpi.prestation,
      Date: formatDateTime(kpi.date),
      Nombre: kpi.count,
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
      title: 'Nombre',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
      align: 'right' as const,
    },
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

      <Table
        columns={columns}
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
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
};

export default Kpis;
