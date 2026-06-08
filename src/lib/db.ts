import fs from 'fs';
import path from 'path';

export type LocalProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
};

export type LocalOrder = {
  id: string;
  order_id_string: string;
  customer_name: string;
  whatsapp: string;
  address: string;
  product_name: string;
  product_id: string;
  size: string;
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
};

export type DatabaseSchema = {
  products: LocalProduct[];
  orders: LocalOrder[];
};

const DB_PATH = path.join(process.cwd(), 'local-db.json');

const INITIAL_DATA: DatabaseSchema = {
  products: [
    {
      id: '1',
      name: 'NEON DRIFT TEE',
      category: 'T-Shirts',
      price: 45.00,
      stock: 12,
      image_url: '/shirt_car_graphic.png'
    },
    {
      id: '2',
      name: 'GRIDLINE ESSENTIAL',
      category: 'T-Shirts',
      price: 40.00,
      stock: 5,
      image_url: '/shirt_minimalist_grid.png'
    }
  ],
  orders: []
};

// Ensure DB exists
export function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
  }
}

// Read DB
export function readDB(): DatabaseSchema {
  initDB();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as DatabaseSchema;
}

// Write DB
export function writeDB(data: DatabaseSchema) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
