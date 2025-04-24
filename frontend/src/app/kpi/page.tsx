/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Table, Typography, Tooltip as AntTooltip, Button, Input, Select, Space, Tooltip, Modal } from "antd";
import { DownloadOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import Papa from "papaparse";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { toast } from "react-toastify";

const { Title } = Typography;

const Kpis = () => {
  const [kpis, setKpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
const [selectedRecord, setSelectedRecord] = useState<any>(null);

// 🔁 Montre le modal
const showDeleteModal = (record: any) => {
  setSelectedRecord(record);
  setIsDeleteModalVisible(true);
};

// ❌ Ferme le modal
const handleCancel = () => {
  setIsDeleteModalVisible(false);
  setSelectedRecord(null);
};


  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF",
    "#FF4560", "#00E396", "#775DD0", "#FEB019", "#FF4560",
    "#00A7E1", "#FF66C3",
  ];

  const fetchData = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        fetch(`${base_url}/prestations/kpis`),
        fetch(`${base_url}/categories`),
        fetch(`${base_url}/clients`)
      ]);
      const [dataKpis, dataCats, dataClients] = await Promise.all([
        res1.json(),
        res2.json(),
        res3.json()
      ]);
      setKpis(dataKpis);
      setCategories(dataCats);
      setClients(dataClients);
    } catch (err) {
      console.error("Erreur de chargement des KPIs ou catégories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch(`${base_url}/prestations/kpis`),
          fetch(`${base_url}/categories`),
          fetch(`${base_url}/clients`)
        ]);
        const [dataKpis, dataCats, dataClients] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json()
        ]);
        setKpis(dataKpis);
        setCategories(dataCats);
        setClients(dataClients);
      } catch (err) {
        console.error("Erreur de chargement des KPIs ou catégories", err);
      } finally {
        setLoading(false);
      }
    };
    setIsClient(true);
    fetchData();
  }, []);

  const filteredData = kpis.filter((item) => {
    const matchesClient =
      selectedClientId === null || item.client?.id === selectedClientId;
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase());
  
    return matchesClient && matchesSearch;
  });

  const actIdToCategory = useMemo(() => {
    const map: Record<number, string> = {};
    categories.forEach((cat: any) => {
      cat.subcategories.forEach((sub: any) => {
        map[sub.id] = cat.name;
      });
    });
    return map;
  }, [categories]);

  const getActStats = () => {
    const stats: Record<string, number> = {};
    filteredData.forEach((kpi) => {
      const name = kpi.subcategory.name || "Inconnu";
      stats[name] = (stats[name] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };

  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    filteredData.forEach((kpi) => {
      const catName = actIdToCategory[kpi?.subcategory?.id] || "Inconnu";
      stats[catName] = (stats[catName] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };

  const getTotalCost = () => {
    return filteredData.reduce((total, kpi) => total + Number(kpi.cout || 0), 0);
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("fr-FR", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleExportCSV = () => {
    const csvData = filteredData.map((kpi) => ({
      Agence: kpi.agence?.name ?? "-",
      Prestation: kpi.prestation ?? "-",
      Date: formatDateTime(kpi.date),
      Coût: kpi.cout ?? "-",
      Autre: kpi.other_act ?? "-",
      NuméroAttestation: kpi.certificate_number ?? "-",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "kpis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* const filteredData = kpis.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(searchText.toLowerCase())
  ); */

// ✅ Supprime le record
const handleConfirmDelete = async () => {
  if (!selectedRecord) return;

  try {
    const response = await fetch(`${base_url}/prestations/${selectedRecord.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` si besoin
      },
    });

    if (!response.ok) {
      throw new Error("La suppression a échoué");
    }

    toast.success("Prestation supprimée avec succès!");
    fetchData(); // recharge les données
  } catch (error) {
    console.log("Erreur de suppression :", error);
    toast.error("Une erreur est survenue lors de la suppression.");
  } finally {
    handleCancel();
  }
};


  const columns = [
    {
      title: "Entreprise",
      dataIndex: "client",
      key: "client",
      render: (_: any, record: any) => record.client?.name ?? "-",
      sorter: (a: any, b: any) => a.client?.name.localeCompare(b.client?.name),
    },
    {
      title: "Prestation",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (_: any, record: any) => {
        const text = record.subcategory?.name;
        return text?.length > 40 ? (
          <AntTooltip title={text}>
            {text.slice(0, 20)}...{text.slice(-15)}
          </AntTooltip>
        ) : (
          text
        );
      }
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => formatDateTime(date),
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Coût (F CFA)",
      dataIndex: "cout",
      key: "cout",
      render: (value: number) => value ?? "-",
      align: "right" as const,
    },
    {
      title: "Numéro d'attestation",
      dataIndex: "certificateNumber",
      key: "certificateNumber",
      render: (value: number) => value ?? "-",
      align: "right" as const,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Modifier">
            <Button
              type="primary"
              icon={<EditFilled />}
              // onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button
              danger
              icon={<DeleteFilled />}
              onClick={() => showDeleteModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (!isClient) return null;

  return (
    
    <div style={styles.container}>
      <Title level={2} style={styles.title}>
        Statistiques des Prestations
      </Title>

      <div style={styles.actions}>
      <Select
        allowClear
        showSearch
        placeholder="Filtrer par entreprise"
        style={{ width: 300, marginRight: 20 }}
        optionFilterProp="children"
        value={selectedClientId}
        onChange={(value) => setSelectedClientId(value ?? null)}
        filterOption={(input, option) =>
          (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
      >
        {clients.map((client) => (
          <Select.Option key={client.id} value={client.id}>
            {client.name}
          </Select.Option>
        ))}
      </Select>

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
        dataSource={filteredData.map((item, index) => ({
          ...item,
          key: index,
        }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
      />
  <div style={styles.totalCostContainer}>
  <Title level={4}>
    Coût total :{" "}
    <span style={{ color: "#e53935", fontSize: "20px", fontWeight: "bold" }}>
      {getTotalCost().toLocaleString("fr-FR")} F CFA
    </span>
  </Title>
</div>

      <div style={styles.chartRow}>
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
                <Cell key={idx} fill={COLORS[(idx + 4) % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={styles.chartContainer}>
          <Title level={4} style={{ marginLeft: 40 }}>
            Répartition par services
          </Title>
          <PieChart width={400} height={400}>
            <Pie
              data={getCategoryStats()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {getCategoryStats().map((_, idx) => (
                <Cell key={idx} fill={COLORS[(idx + 4) % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <Link href="/" style={styles.backLink}>
          ← Retour à la saisie
        </Link>
      </div>
      <Modal
        title="Confirmation de suppression"
        open={isDeleteModalVisible}
        onCancel={handleCancel}
        onOk={handleConfirmDelete}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer cette prestation ? Cette action est irréversible.</p>
      </Modal>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: "30px",
    margin: "40px auto",
    padding: "30px",
    maxWidth: "1100px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.05)",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "30px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  searchInput: {
    width: 300,
    borderRadius: 6,
  },
  backLink: {
    marginBottom: "10px",
    paddingLeft: "0",
    fontSize: "16px",
    color: "#1890ff",
    fontWeight: "bold",
    marginTop: "40px",
  },
  chartRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "40px",
  },
  chartContainer: {
    flex: 1,
    minWidth: "300px",
  },
  totalCostContainer:{
    textAlign: "center",
    marginBottom: "50px",
    marginTop: "20px",
    color: "#43a047"
  }
};

export default Kpis;
