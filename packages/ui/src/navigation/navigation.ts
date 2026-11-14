import { NavItem } from '../shell/Sidebar.js';

export const sellerNavigation: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'stores', label: 'Stores', icon: '🏪', path: '/stores' },
  { id: 'products', label: 'Products', icon: '📦', path: '/products' },
  { id: 'inventory', label: 'Inventory', icon: '🏭', path: '/inventory' },
  { id: 'orders', label: 'Orders', icon: '🛒', path: '/orders', badge: 'New' },
  { id: 'themes', label: 'Themes', icon: '🎨', path: '/themes' },
  { id: 'finance', label: 'Finance', icon: '💳', path: '/finance' },
];

export const supplierNavigation: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'catalog', label: 'Catalog', icon: '📚', path: '/catalog' },
  { id: 'offers', label: 'Offers', icon: '🏷️', path: '/offers' },
  { id: 'inventory', label: 'Inventory', icon: '🏭', path: '/inventory' },
  { id: 'fulfillment', label: 'Fulfillment', icon: '🚚', path: '/fulfillment' },
];

export const adminNavigation: NavItem[] = [
  { id: 'dashboard', label: 'غرفة العمليات', icon: '📊', path: '/dashboard' },
  { id: 'merchants', label: 'إدارة المتاجر والتجار', icon: '🏢', path: '/merchants' },
  { id: 'suppliers', label: 'إدارة الموردين والجملة', icon: '🔗', path: '/suppliers' },
  { id: 'tenants', label: 'مساحات العمل', icon: '🏬', path: '/tenants' },
  { id: 'merchant-details', label: 'تفاصيل المتجر', icon: '🔎', path: '/merchant-details' },
  { id: 'users', label: 'المستخدمون والحسابات', icon: '👥', path: '/users' },
  { id: 'roles', label: 'الهوية والصلاحيات SSO', icon: '🛡️', path: '/roles' },
  { id: 'plans', label: 'خطط الاشتراك والقيود', icon: '📋', path: '/plans' },
  { id: 'payments', label: 'بوابات الدفع MatjerHub Pay', icon: '💳', path: '/payments' },
  { id: 'withdrawals', label: 'طلبات السحب والتسويات', icon: '💸', path: '/withdrawals' },
  { id: 'transactions', label: 'المعاملات والمحافظ', icon: '🧾', path: '/transactions' },
  { id: 'markets', label: 'الأسواق والعملات', icon: '🌍', path: '/markets' },
  { id: 'logistics', label: 'اللوجستيات وشركات الشحن', icon: '🚚', path: '/logistics' },
  { id: 'integrations', label: 'التكاملات و Webhooks', icon: '🔗', path: '/integrations' },
  { id: 'reports', label: 'التقارير والتصدير', icon: '📈', path: '/reports' },
  { id: 'audit', label: 'سجل التدقيق الأمني', icon: '🧭', path: '/audit' },
  { id: 'configuration', label: 'إعدادات النظام', icon: '⚙️', path: '/configuration' },
];

export const navigationRegistry = {
  seller: sellerNavigation,
  supplier: supplierNavigation,
  admin: adminNavigation,
};
