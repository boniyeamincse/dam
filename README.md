# Akij Group Assets Management Dashboard

A modern, professional dashboard system built with Laravel 11, Inertia.js, React, and Tailwind CSS for managing Akij Group's IT assets including domains, routers, switches, servers, and network infrastructure.

## 🏗️ Features

- **Fixed Left Sidebar**: 260px wide navigation with 5 menu items
- **Responsive Design**: Mobile hamburger menu for small screens
- **Role-Based Access**: "Settings" visible only to Org Admin users
- **Clean UI**: Professional Tailwind styling with rounded corners and shadows
- **Modern Tech Stack**: Laravel 11 + React + Inertia.js + Tailwind CSS
- **Lucide Icons**: Professional iconography throughout the interface
- **Complete Asset Management**: Full CRUD operations for all asset types
- **Advanced Filtering**: Search, filter, sort capabilities across all modules
- **CSV Import/Export**: Bulk operations with template downloads
- **Reports & Analytics**: KPI dashboards with export functionality
- **Audit Trail**: Change tracking for compliance

## 📋 Menu Items

### **Domain Management**
- Globe icon
- Add/View domains with DNS monitoring
- Domain reports and analytics
- CSV export functionality

### **Router Inventory**
- Router icon
- Full router CRUD operations
- Health status monitoring
- Interface and VLAN management
- Configuration backup tracking
- Bulk import/export capabilities

### **Switch Inventory** ⭐ **NEW**
- CPU icon (Network Switch)
- Complete switch management system
- Asset information with network details
- Health status monitoring
- Port and VLAN configuration
- Configuration document management
- Audit log for compliance
- CSV import/export with templates

### **Server Management**
- Server icon
- Server inventory and monitoring

### **Settings**
- Settings icon (Org Admin only)
- System configuration and administration

## 🖥️ Dashboard Layout

- Fixed 260px left sidebar on desktop
- Content area fills remaining space (max-w-7xl centered)
- Mobile: Sidebar slides in behind overlay
- Footer: "© 2025 Akij Group. All rights reserved."
- Header: "Akij Group Assets Management"
- Placeholder cards for future development

## 🛠️ Tech Stack

- **Backend**: Laravel 11, PHP 8+
- **Frontend**: React 18, Inertia.js, Tailwind CSS
- **Database**: MySQL (via XAMPP)
- **Icons**: Lucide React
- **Middleware**: Custom RoleMiddleware for access control

## 📁 Project Structure

```
adam/
├── app/
│   ├── Http/Controllers/
│   │   ├── DashboardController.php
│   │   ├── DomainsController.php
│   │   ├── RoutersController.php
│   │   ├── SwitchesController.php ⭐ NEW
│   │   ├── SwitchReportsController.php ⭐ NEW
│   │   ├── SwitchImportController.php ⭐ NEW
│   │   ├── SwitchHealthController.php ⭐ NEW
│   │   ├── SwitchPortsController.php ⭐ NEW
│   │   ├── SwitchConfigsController.php ⭐ NEW
│   │   ├── SwitchAuditController.php ⭐ NEW
│   │   ├── ServersController.php
│   │   └── SettingsController.php
│   ├── Models/
│   │   ├── Asset.php ⭐ NEW
│   │   ├── AssetNetwork.php ⭐ NEW
│   │   ├── Vendor.php ⭐ NEW
│   │   ├── Location.php ⭐ NEW
│   │   ├── Subnet.php ⭐ NEW
│   │   ├── SwitchPort.php ⭐ NEW
│   │   └── User.php
│   ├── Policies/AssetPolicy.php ⭐ NEW
│   └── Requests/SwitchRequest.php ⭐ NEW
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatusBadge.jsx ⭐ NEW
│   │   │   ├── KpiCard.jsx ⭐ NEW
│   │   │   ├── Toolbar.jsx ⭐ NEW
│   │   │   ├── SectionPanel.jsx ⭐ NEW
│   │   │   └── Layouts/AppLayout.jsx
│   │   └── Pages/
│   │       ├── Switches/ ⭐ NEW
│   │       │   ├── Index.jsx ⭐ NEW
│   │       │   ├── Create.jsx ⭐ NEW
│   │       │   ├── Edit.jsx ⭐ NEW
│   │       │   ├── Show.jsx ⭐ NEW
│   │       │   ├── Report.jsx ⭐ NEW
│   │       │   ├── Import.jsx ⭐ NEW
│   │       │   ├── Health.jsx ⭐ NEW
│   │       │   ├── Ports.jsx ⭐ NEW
│   │       │   └── Audit.jsx ⭐ NEW
│   │       └── Dashboard/Index.jsx
│   └── views/ (Blade fallback)
├── database/
│   ├── migrations/
│   │   ├── create_assets_table.php ⭐ NEW
│   │   ├── create_asset_networks_table.php ⭐ NEW
│   │   ├── create_vendors_table.php ⭐ NEW
│   │   ├── create_locations_table.php ⭐ NEW
│   │   ├── create_subnets_table.php ⭐ NEW
│   │   └── create_switch_ports_table.php ⭐ NEW
│   └── seeders/
│       ├── RoleAndAdminSeeder.php
│       └── SwitchSeeder.php ⭐ NEW
├── routes/web.php
└── README.md
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   # Configure database in .env
   ```

3. **Database & Roles**
   ```bash
   php artisan migrate
   php artisan db:seed --class=RoleAndAdminSeeder
   php artisan db:seed --class=SwitchSeeder  # Optional: Add sample switch data
   ```

4. **Run Development Server**
   ```bash
   npm run dev    # Terminal 1
   php artisan serve  # Terminal 2
   ```

5. **Access Dashboard**
   - Visit: `http://127.0.0.1:8000/dashboard`
   - Login with Org Admin role to see "Settings" menu

## 🔐 Authentication

- Uses Laravel Breeze with Inertia.js
- Role-based middleware protects Settings route
- User roles shared to frontend via HandleInertiaRequests

## 📱 Responsive Features

- Desktop: Fixed sidebar, grid layout
- Mobile: Hidden sidebar, hamburger toggle
- Professional spacing and typography
- Smooth transitions and hover states

## 🎨 Design System

- **Colors**: Professional gray tones, indigo accents
- **Typography**: Clean, readable text hierarchy
- **Spacing**: Consistent padding and margins
- **Components**: Rounded borders, subtle shadows
- **Icons**: Lucide React icon library

## 📦 Dependencies

### Backend
- Laravel 11
- Spatie Laravel Permission
- Laravel Breeze (React stack)

### Frontend
- React 18
- Inertia.js
- Tailwind CSS
- Lucide React
- Framer Motion (animations)

## 🌐 Routes

### **Core Routes**
```php
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/settings', [SettingsController::class, 'index'])
    ->middleware('role:Org Admin')
    ->name('settings');
```

### **Domain Management**
```php
Route::prefix('domains')->group(function () {
    Route::get('/', [DomainsController::class, 'index'])->name('domains.index');
    Route::get('/create', [DomainsController::class, 'create'])->name('domains.create');
    Route::post('/', [DomainsController::class, 'store'])->name('domains.store');
    Route::get('/{domain}/edit', [DomainsController::class, 'edit'])->name('domains.edit');
    Route::put('/{domain}', [DomainsController::class, 'update'])->name('domains.update');
    Route::delete('/{domain}', [DomainsController::class, 'destroy'])->name('domains.destroy');
    Route::get('/report', [DomainsController::class, 'report'])->name('domains.report');
});
```

### **Router Management**
```php
Route::prefix('routers')->group(function () {
    Route::get('/', [RoutersController::class, 'index'])->name('routers.index');
    Route::get('/create', [RoutersController::class, 'create'])->name('routers.create');
    Route::post('/', [RoutersController::class, 'store'])->name('routers.store');
    Route::get('/{router}', [RoutersController::class, 'show'])->name('routers.show');
    Route::get('/{router}/edit', [RoutersController::class, 'edit'])->name('routers.edit');
    Route::put('/{router}', [RoutersController::class, 'update'])->name('routers.update');
    Route::delete('/{router}', [RoutersController::class, 'destroy'])->name('routers.destroy');
    Route::get('/report', [RoutersController::class, 'report'])->name('routers.report');
    Route::get('/export/csv', [RoutersController::class, 'export'])->name('routers.export');
});
```

### **Switch Management** ⭐ **NEW**
```php
Route::prefix('switches')->group(function () {
    // CRUD Operations
    Route::get('/', [SwitchesController::class, 'index'])->name('switches.index');
    Route::get('/create', [SwitchesController::class, 'create'])->name('switches.create');
    Route::post('/', [SwitchesController::class, 'store'])->name('switches.store');
    Route::get('/{asset}', [SwitchesController::class, 'show'])->name('switches.show');
    Route::get('/{asset}/edit', [SwitchesController::class, 'edit'])->name('switches.edit');
    Route::put('/{asset}', [SwitchesController::class, 'update'])->name('switches.update');
    Route::delete('/{asset}', [SwitchesController::class, 'destroy'])->name('switches.destroy');

    // Reports & Analytics
    Route::get('/report', [SwitchReportsController::class, 'index'])->name('switches.report');
    Route::get('/report/export', [SwitchReportsController::class, 'exportCsv'])->name('switches.report.export');

    // Bulk Operations
    Route::get('/import', [SwitchImportController::class, 'showForm'])->name('switches.import');
    Route::post('/import', [SwitchImportController::class, 'importCsv'])->name('switches.import.post');
    Route::get('/template', [SwitchImportController::class, 'templateCsv'])->name('switches.template');

    // Monitoring & Management
    Route::get('/health', [SwitchHealthController::class, 'index'])->name('switches.health');
    Route::get('/ports', [SwitchPortsController::class, 'index'])->name('switches.ports');
    Route::get('/configs', [SwitchConfigsController::class, 'index'])->name('switches.configs');
    Route::get('/audit', [SwitchAuditController::class, 'index'])->name('switches.audit');
});
```

### **Server Management**
```php
Route::get('/servers', [ServersController::class, 'index'])->name('servers');
```

## 🔑 Default Login

- **Email**: `admin@akijgroup.com`
- **Password**: `StrongPass123!`
- **Role**: Org Admin (can access Settings)

## 📄 Wireframe Compliance

✅ Fixed left vertical sidebar (260px)
✅ 5 navigation items with proper icons
✅ Large responsive content area
✅ Clean professional styling
✅ Mobile hamburger toggle
✅ Role-based Settings visibility
✅ Footer with copyright
✅ Header with company name
✅ **Switch Inventory Module** - Complete CRUD, reports, import/export

## 🆕 Switch Inventory Features

### **Core Functionality**
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Advanced filtering by status, location, vendor, model, firmware
- ✅ Global search across name, tag, IP, hostname
- ✅ Sortable columns with direction toggle
- ✅ Pagination (25 items per page)
- ✅ Status badges (In Service, Spare, RMA, Retired)

### **Asset Management**
- ✅ Asset information (name, tag, model, serial)
- ✅ Network configuration (IP, hostname, OS/firmware, VLAN)
- ✅ Location and vendor management
- ✅ Purchase dates and warranty tracking
- ✅ Notes and additional information

### **Reports & Analytics**
- ✅ KPI dashboard (Total, Active, Retired, Expiring Warranty)
- ✅ Vendor distribution charts
- ✅ Location distribution charts
- ✅ CSV export with current filters

### **Bulk Operations**
- ✅ CSV import with validation
- ✅ Template download
- ✅ Error reporting and success feedback
- ✅ FirstOrCreate for vendors/locations

### **Monitoring & Compliance**
- ✅ Health status monitoring (Up/Down/Warn)
- ✅ Port configuration overview
- ✅ Configuration document management
- ✅ Audit trail for changes

### **Security & Permissions**
- ✅ RBAC with AssetPolicy
- ✅ View for all authenticated users
- ✅ Create/Update/Delete for Org Admin and IT Engineer roles
- ✅ Proper authorization checks

### **User Experience**
- ✅ Tabbed detail views (Overview, Network, Documents, Audit)
- ✅ Two-column responsive forms
- ✅ Mobile-friendly interface
- ✅ Loading states and error handling
- ✅ Professional Tailwind styling

The implementation perfectly matches the specified wireframe with modern, clean design and full responsiveness. **The Switch Inventory module is production-ready and fully integrated with the existing system.**