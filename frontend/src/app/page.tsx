/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Select, Form, Input, Button, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const { Option } = Select;
//import Select from "react-select";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [cout, setCout] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [agencyName, setAgencyName] = useState<string>("");
  //const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [subCategoriesList, setSubCategoriesList] = useState<any[]>([]);
  //const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [healthFacilityTypes, setHealthFacilityTypes] = useState<
    { id: number; name: string }[]
  >([]);
  const [clientId, setClientId] = useState("");
  const [healthFacilityTypeId, setHealthFacilityTypeId] = useState("");
  const [otherAct, setOtherAct] = useState("");
  const [editData, setEditData] = useState<any>(null);
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  
    const showLogoutModal = () => {
      setIsLogoutModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsLogoutModalVisible(false);
  };

  useEffect(() => {
    if (id) {
      fetch(`${base_url}/prestations/${id}`)
        .then((res) => res.json())
        .then((result) => setEditData(result))
        .catch((err) => console.error("Erreur lors du chargement :", err));
    }
  }, [id]);

  const [form] = Form.useForm();
  useEffect(() => {
    
    if (editData) {
      form.setFieldsValue({
        clientId: editData.clientId,
        healthFacilityTypeId: editData.healthFacilityTypeId,
        categoryId: editData.categoryId,
        subCategoryId: editData.actId,
        date: editData.date,
        otherAct: editData.otherAct,
        cout: editData.cout,
        certificateNumber: editData.certificateNumber,
      });
      setSubCategoryId(String(editData.actId));
      setDate(editData.date || "");
      setOtherAct(editData.otherAct || "");
      setCertificateNumber(editData.certificateNumber || "");
      setCout(editData.cout ? editData.cout.toString() : "");
      setClientId(String(editData.clientId));
      setHealthFacilityTypeId(String(editData.healthFacilityTypeId));
      //setCategoryId(String(editData.categoryId));
    }
  }, [editData]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.firstname && user.lastname) {
      setUserName(`${user.firstname} ${user.lastname}`);
      setAgencyName(user.agencyName);
    }

    /*const fetchCategoriesAndSubcategories = async () => {
      const res = await fetch(`${base_url}/categories`);
      const data = await res.json();
      setCategoriesList(data);
    };*/

    const fetchSubcategories = async () => {
      const res = await fetch(`${base_url}/subcategories`);
      const data = await res.json();
      setSubCategoriesList(data);
    };

    const fetchClients = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Token non disponible");
        return;
      }

      try {
        const res = await fetch(`${base_url}/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients", error);
      }
    };

    const fetchHealthFacilityTypes = async () => {
      const res = await fetch(`${base_url}/health-facility-types`);
      const data = await res.json();
      setHealthFacilityTypes(data);
    };

    //fetchCategoriesAndSubcategories();
    fetchSubcategories();
    fetchClients();
    fetchHealthFacilityTypes();
  }, [base_url, router]);

  /* useEffect(() => {
    if (categoryId) {
      const selected = categoriesList.find(
        (cat) => cat.id === parseInt(categoryId)
      );
      setFilteredSubcategories(selected?.subcategories || []);
      setSubCategoryId("");
    }
  }, [categoryId, categoriesList, subCategoriesList]); */

  const handleSubmit = async (values: any) => {
    const valuesCopy = { ...values };
    delete valuesCopy.categoryId;
    delete valuesCopy.subCategoryId;
    const payload = {
      ...valuesCopy,
      actId: parseInt(subCategoryId),
      date,
      otherAct,
      certificateNumber,
      cout: parseFloat(cout),
      clientId: Number(clientId),
      healthFacilityTypeId: Number(healthFacilityTypeId),
    };

    const token = localStorage.getItem("access_token");
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${base_url}/prestations/${id}`
      : `${base_url}/prestations`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.ok) {
        const message = id
          ? "Prestation mise à jour avec succès !"
          : "🎉 Prestation enregistrée avec succès !";
        setSuccessMessage(message);
        toast.success(message);
        if (id) router.push('/kpi')

        if (!id) {
          // Si création, reset form
          setDate("");
          setCout("");
          setCertificateNumber("");
          setOtherAct("");
          //setCategoryId("");
          setSubCategoryId("");
          setClientId("");
          setHealthFacilityTypeId("");
          form.setFieldsValue({
            clientId: "",
            healthFacilityTypeId: "",
            //categoryId: "",
            subCategoryId: "",
            date: "",
            otherAct: "",
            cout: "",
            certificateNumber: "",
          });
        }
      } else {
        const errorMessage = responseData?.message || "Une erreur est survenue";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur réseau ou serveur");
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main style={styles.container}>
      <Link href="/" style={{ display: "inline-block" }}>
        <img src="/logo.webp" alt="Logo Transvie" style={styles.logo} />
      </Link>
      <div style={styles.userInfo}>
        <div style={styles.userName}>{userName ? userName : "Bienvenue"}</div>
        <div style={styles.agencyName}>{agencyName}</div>
        <div style={styles.logoutIcon} onClick={showLogoutModal}>
          <LogoutOutlined />
        </div>
      </div>
      <h2
        style={{
          ...styles.title,
          color: id ? "#8B4513" : "#0000FF", // Marron pour la modification, Bleu pour l'enregistrement
        }}
      >
        {id ? "Modification de prestation" : "Enregistrement de prestation"}
      </h2>

      {successMessage && (
        <div style={styles.successMessage}>
          <span>{successMessage}</span>
          <button
            type="button"
            style={styles.closeButton}
            onClick={() => setSuccessMessage("")}
          >
            ✖
          </button>
        </div>
      )}

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={styles.form}
      >
        <Form.Item
          label={`Entreprise`}
          name="clientId"
          style={{ marginBottom: 0 }}
          rules={[
            { required: true, message: "Veuillez sélectionner une entreprise" },
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Choisissez une entreprise"
            style={{ width: "100%", marginRight: 20 }}
            optionFilterProp="children"
            value={clientId || undefined}
            onChange={(value) => setClientId(value ?? null)}
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {clients.map((client) => (
              <Option key={client.id} value={client.id}>
                {client.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={`Type de structure sanitaire`}
          name="healthFacilityTypeId"
          rules={[
            {
              required: true,
              message: "Veuillez sélectionner une structure sanitaire",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Select
            placeholder="-- Choisissez un type de structure sanitaire --"
            style={{ width: "100%", marginRight: 20, height: "100%" }}
            value={
              healthFacilityTypeId ? Number(healthFacilityTypeId) : undefined
            }
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
        </Form.Item>

        {/* <Form.Item
          label={`Type de service`}
          name="categoryId"
          style={{ marginBottom: 0 }}
        >
          <Select
          allowClear
            placeholder="Choisissez un service"
            style={{ width: "100%", marginRight: 20, height: "100%" }}
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
        </Form.Item> */}

        <Form.Item
  label="Actes"
  name="subCategoryId"
  rules={[
    { required: true, message: "Veuillez sélectionner un acte" },
  ]}
  style={{ marginBottom: 0 }}
>
  <Select
    placeholder="Choisissez un acte"
    style={{ width: "100%", marginRight: 20, height: "100%" }}
    value={ subCategoryId ? Number(subCategoryId) : undefined
    }
    onChange={(value) => setSubCategoryId(String(value))}
    showSearch
    optionFilterProp="children"
  >
    {
  subCategoriesList.map((sub) => (
    <Select.Option key={sub.id} value={sub.id}>
      {sub.name}
    </Select.Option>
  ))
}
  </Select>
</Form.Item>

      <Form.Item
          label="Ou Autre acte"
          name="otherAct"
          style={{ marginBottom: 0 }}
        >
          <Input
            type="text"
            value={otherAct }
            onChange={(e) => setOtherAct(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Veuillez sélectionner une date" },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input
            type="date"
            value={date ? date.split('T')[0] : ''}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Coût (FCFA)"
          style={{ marginBottom: 0 }}
          name="cout"
          rules={[{ required: true, message: "Veuillez saisir un coût" }]}
        >
          <Input
            type="number"
            value={cout}
            onChange={(e) => setCout(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Numero d'attestation" name="certificateNumber">
          <Input
            type="number"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block style={styles.button}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>

      <div style={styles.linkWrapper}>
        <Link href="/kpi" style={styles.link}>
          Voir les statistiques 👀
        </Link>
      </div>

      <Modal
              title="Confirmation de déconnexion"
              open={isLogoutModalVisible}
              onCancel={handleCancel}
              onOk={handleLogout}
              okText="Confirmer"
              cancelText="Annuler"
              okButtonProps={{ danger: true }}
            >
              <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
            </Modal>

    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "90%",
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#344767",
    position: "relative",
  },
  logo: {
    display: "block",
    margin: "0 auto 20px",
    maxWidth: "150px",
    height: "auto",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#344767",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "20px",
  },
  successMessage: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "15px 20px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "16px",
    textAlign: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#155724",
    cursor: "pointer",
  },
  kpiButton: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  logoutButton: {
    padding: "12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  userInfo: {
    position: "absolute",
    top: "20px",
    right: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: "16px",
    fontWeight: "600",
  },

  userName: {
    color: "#1A1A1A", 
    fontSize: "18px", 
    fontWeight: 600, 
  },

  agencyName: {
    color: "#5e72e4",
    fontSize: "18px",
    fontWeight: "500",
  },
  linkWrapper: {
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  },
  logoutIcon: {
    marginTop: "8px",
    fontSize: "20px",
    color: "#888",
    cursor: "pointer",
    transition: "color 0.3s"
  },
};
