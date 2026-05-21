/* ─────────────────────────────────────────────────────────────────
   FROST AI — Integrations Data
   Importado por IntegrationsSection.tsx
───────────────────────────────────────────────────────────────── */

export const INTEGRATIONS = [
  // ERP
  { id: "sap",       name: "SAP",           category: "ERP",          accent: "#0070f3" },
  { id: "oracle",    name: "Oracle ERP",    category: "ERP",          accent: "#f80000" },
  { id: "dynamics",  name: "MS Dynamics",   category: "ERP",          accent: "#0078d4" },
  { id: "odoo",      name: "Odoo",          category: "ERP",          accent: "#875a7b" },

  // BI
  { id: "powerbi",   name: "Power BI",      category: "BI",           accent: "#f2c811" },
  { id: "tableau",   name: "Tableau",       category: "BI",           accent: "#e97627" },
  { id: "looker",    name: "Looker",        category: "BI",           accent: "#4285f4" },

  // Cloud
  { id: "aws",       name: "AWS",           category: "Cloud",        accent: "#ff9900" },
  { id: "azure",     name: "Azure",         category: "Cloud",        accent: "#0089d6" },
  { id: "gcp",       name: "Google Cloud",  category: "Cloud",        accent: "#4285f4" },

  // Database
  { id: "postgres",  name: "PostgreSQL",    category: "Database",     accent: "#336791" },
  { id: "mysql",     name: "MySQL",         category: "Database",     accent: "#4479a1" },
  { id: "sqlserver", name: "SQL Server",    category: "Database",     accent: "#cc2927" },
  { id: "mongo",     name: "MongoDB",       category: "Database",     accent: "#47a248" },

  // IoT
  { id: "scada",     name: "SCADA",         category: "IoT",          accent: "#06B6D4" },
  { id: "modbus",    name: "Modbus/OPC-UA", category: "IoT",          accent: "#2563EB" },
  { id: "mqtt",      name: "MQTT Broker",   category: "IoT",          accent: "#660066" },

  // Comunicación
  { id: "slack",     name: "Slack",         category: "Comunicación", accent: "#4a154b" },
  { id: "teams",     name: "MS Teams",      category: "Comunicación", accent: "#5059c9" },
  { id: "whatsapp",  name: "WhatsApp API",  category: "Comunicación", accent: "#25d366" },

  // Gobierno (Chile)
  { id: "subdere",   name: "SUBDERE",       category: "Gobierno",     accent: "#2563EB" },
  { id: "sii",       name: "SII Chile",     category: "Gobierno",     accent: "#1a4f8a" },
  { id: "previred",  name: "Previred",      category: "Gobierno",     accent: "#0072bc" },
] as const;

export type IntegrationCategory =
  | "ERP"
  | "BI"
  | "Cloud"
  | "Database"
  | "IoT"
  | "Comunicación"
  | "Gobierno";

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  "ERP", "BI", "Cloud", "Database", "IoT", "Comunicación", "Gobierno",
];