# Akij Group Assets Management Dashboard

A comprehensive, modern dashboard system built with Laravel 11, Inertia.js, React, and Tailwind CSS for managing Akij Group's complete IT asset inventory. Specializes in network device management including routers, switches, cameras, access points (APs), firewalls, and server infrastructure with advanced monitoring, reporting, and compliance features.

## 🏗️ Features

- **Complete Inventory Management**: Specialized for network devices (routers, switches, cameras, APs, firewalls)
- **Fixed Left Sidebar**: 260px wide navigation with expandable menu items
- **Responsive Design**: Mobile hamburger menu with professional UX
- **Role-Based Access Control**: Granular permissions (Org Admin, IT Engineer, Viewer, Auditor)
- **Advanced Asset Management**: Full CRUD with network configuration tracking
- **Smart Filtering & Search**: Multi-criteria filtering across all asset properties
- **Bulk Operations**: CSV import/export with validation and error handling
- **Real-time Monitoring**: Health status, port management, configuration tracking
- **Compliance & Audit**: Complete audit trail and change management
- **Professional UI**: Modern design with Tailwind CSS and smooth animations
- **Modern Tech Stack**: Laravel 11 + React 18 + Inertia.js + Tailwind CSS

## 📋 Asset Management Modules

### **🌐 Domain Management**
- **Icon**: Globe
- **Features**: DNS monitoring, domain lifecycle management
- **Capabilities**: Domain registration tracking, expiration alerts, bulk operations
- **Reports**: Domain analytics, renewal schedules, CSV export

### **🖧 Router Inventory System**
- **Icon**: Router
- **Features**: Complete router lifecycle management
- **Capabilities**: Interface configuration, routing protocols, health monitoring
- **Management**: Configuration backups, firmware tracking, VLAN management
- **Operations**: Bulk import/export, performance analytics

### **🔀 Switch Inventory System** ⭐ **PRODUCTION READY**
- **Icon**: CPU (Network Switch)
- **Features**: Complete network switch management
- **Capabilities**: Port configuration, VLAN management, PoE tracking
- **Monitoring**: Real-time health status, traffic monitoring, error tracking
- **Compliance**: Configuration audits, change management, documentation
- **Operations**: CSV bulk operations, template downloads, validation

### **📹 Network Camera Inventory**
- **Icon**: Camera (planned)
- **Features**: IP camera management and monitoring
- **Capabilities**: RTSP configuration, recording settings, storage management
- **Integration**: Video analytics, motion detection, access control

### **📡 Access Point Management**
- **Icon**: Wifi (planned)
- **Features**: Wireless AP inventory and configuration
- **Capabilities**: SSID management, security settings, coverage mapping
- **Monitoring**: Client connections, signal strength, performance metrics

### **🛡️ Firewall Management**
- **Icon**: Shield (planned)
- **Features**: Firewall rule management and compliance
- **Capabilities**: Policy configuration, threat monitoring, access control
- **Security**: Audit logging, compliance reporting, incident tracking

### **🖥️ Server Infrastructure**
- **Icon**: Server
- **Features**: Server inventory and capacity planning
- **Capabilities**: Hardware specs, OS management, performance monitoring
- **Operations**: Maintenance scheduling, backup management, lifecycle tracking

### **⚙️ System Administration**
- **Icon**: Settings (Org Admin only)
- **Features**: System configuration and user management
- **Capabilities**: RBAC configuration, audit settings, system maintenance

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

## 📁 Project Architecture

```
adam/ (Akij Group Assets Management Dashboard)
├── app/
│   ├── Http/Controllers/
│   │   ├── DashboardController.php
│   │   ├── DomainController.php
│   │   ├── RoutersController.php
│   │   ├── SwitchesController.php ⭐ PRODUCTION READY
│   │   ├── SwitchReportsController.php ⭐ NEW
│   │   ├── SwitchImportController.php ⭐ NEW
│   │   ├── SwitchHealthController.php ⭐ NEW
│   │   ├── SwitchPortsController.php ⭐ NEW
│   │   ├── SwitchConfigsController.php ⭐ NEW
│   │   ├── SwitchAuditController.php ⭐ NEW
│   │   ├── ServersController.php (planned)
│   │   └── SettingsController.php
│   ├── Models/
│   │   ├── Asset.php ⭐ Core Asset Model
│   │   ├── AssetNetwork.php ⭐ Network Configuration
│   │   ├── Vendor.php ⭐ Vendor Management
│   │   ├── Location.php ⭐ Location Tracking
│   │   ├── Subnet.php ⭐ Network Subnets
│   │   ├── SwitchPort.php ⭐ Port Management
│   │   ├── Router.php
│   │   └── User.php
│   ├── Policies/
│   │   └── AssetPolicy.php ⭐ RBAC Implementation
│   └── Requests/
│       └── SwitchRequest.php ⭐ Form Validation
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Sidebar.jsx (expandable menus)
│   │   │   ├── StatusBadge.jsx ⭐ Status Indicators
│   │   │   ├── KpiCard.jsx ⭐ Analytics Cards
│   │   │   ├── Toolbar.jsx ⭐ Advanced Filtering
│   │   │   ├── SectionPanel.jsx ⭐ Content Panels
│   │   │   └── Layouts/AppLayout.jsx
│   │   └── Pages/
│   │       ├── Dashboard/Index.jsx
│   │       ├── Domains/ ⭐ Domain Management
│   │       ├── Routers/ ⭐ Router Management
│   │       └── Switches/ ⭐ COMPLETE MODULE
│   │           ├── Index.jsx (asset list with filters)
│   │           ├── Create.jsx (two-column form)
│   │           ├── Edit.jsx (pre-populated form)
│   │           ├── Show.jsx (tabbed details view)
│   │           ├── Report.jsx (KPI dashboard)
│   │           ├── Import.jsx (CSV bulk import)
│   │           ├── Health.jsx (status monitoring)
│   │           ├── Ports.jsx (port configuration)
│   │           └── Audit.jsx (change tracking)
│   └── views/ (Blade fallbacks)
├── database/
│   ├── migrations/
│   │   ├── create_assets_table.php ⭐ Asset Schema
│   │   ├── create_asset_networks_table.php ⭐ Network Schema
│   │   ├── create_vendors_table.php ⭐ Vendor Schema
│   │   ├── create_locations_table.php ⭐ Location Schema
│   │   ├── create_subnets_table.php ⭐ Subnet Schema
│   │   └── create_switch_ports_table.php ⭐ Port Schema
│   └── seeders/
│       ├── RoleAndAdminSeeder.php (RBAC setup)
│       └── SwitchSeeder.php ⭐ Sample Switch Data
├── routes/
│   └── web.php (comprehensive routing)
├── config/ (Laravel configuration)
├── storage/ (file uploads, logs)
├── tests/ (unit & feature tests)
└── README.md
```

## 🚀 Quick Start Guide

### **Prerequisites**
- PHP 8.2+ with Composer
- Node.js 18+ with npm
- MySQL 8.0+ or PostgreSQL
- XAMPP/WAMP (for local development)

### **1. Environment Setup**
```bash
# Clone repository
git clone https://github.com/boniyeamincse/dam.git
cd adam

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Configure environment
cp .env.example .env
php artisan key:generate
# Edit .env with your database credentials
```

### **2. Database Initialization**
```bash
# Run migrations
php artisan migrate

# Seed roles and permissions
php artisan db:seed --class=RoleAndAdminSeeder

# Optional: Add sample switch inventory data
php artisan db:seed --class=SwitchSeeder
```

### **3. Start Development Servers**
```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Laravel server
php artisan serve
```

### **4. Access the Application**
- **Dashboard**: `http://127.0.0.1:8000/dashboard`
- **Switch Inventory**: `http://127.0.0.1:8000/switches` ⭐ **NEW**
- **Switch Reports**: `http://127.0.0.1:8000/switches/report` ⭐ **NEW**
- **Switch Import**: `http://127.0.0.1:8000/switches/import` ⭐ **NEW**

### **5. Default Login Credentials**
- **Email**: `admin@akijgroup.com`
- **Password**: `StrongPass123!`
- **Role**: Org Admin (full access to all modules)

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

## 📦 Technology Stack & Dependencies

### **Backend Architecture**
- **Laravel 11**: Modern PHP framework with advanced features
- **Spatie Laravel Permission**: Role-based access control (RBAC)
- **Laravel Breeze**: Authentication with React/Inertia.js integration
- **Eloquent ORM**: Advanced database relationships and querying
- **Database**: MySQL 8.0+ with support for PostgreSQL

### **Frontend Architecture**
- **React 18**: Component-based UI with hooks and modern features
- **Inertia.js**: Seamless SPA experience without API complexity
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Professional icon library with 1000+ icons
- **Framer Motion**: Smooth animations and transitions

### **Asset Management Features**
- **Multi-Asset Support**: Routers, switches, cameras, APs, firewalls, servers
- **Network Configuration**: IP management, VLANs, subnets, port tracking
- **Advanced Filtering**: Status, location, vendor, model, firmware filters
- **Bulk Operations**: CSV import/export with validation and error handling
- **Real-time Monitoring**: Health status, performance metrics, alerts
- **Compliance & Audit**: Complete change tracking and compliance reporting

### **Security & Performance**
- **RBAC Implementation**: Granular permissions (Org Admin, IT Engineer, Viewer, Auditor)
- **Form Validation**: Comprehensive server-side and client-side validation
- **CSRF Protection**: Laravel's built-in security features
- **Database Optimization**: Proper indexing and query optimization
- **Responsive Design**: Mobile-first approach with professional UX

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

## 🔐 User Roles & Permissions

### **Role-Based Access Control**
- **Org Admin**: Full system access, settings management, all CRUD operations
- **IT Engineer**: Create/update/delete assets, manage configurations, reports
- **Viewer**: Read-only access to all asset information and reports
- **Auditor**: Limited access to audit logs and compliance reports

### **Default Administrative Account**
- **Email**: `admin@akijgroup.com`
- **Password**: `StrongPass123!`
- **Role**: Org Admin (complete system access)

### **Switch Inventory Permissions**
- **View**: All authenticated users (Viewer, Auditor, IT Engineer, Org Admin)
- **Create/Update/Delete**: IT Engineer and Org Admin roles only
- **Import/Export**: IT Engineer and Org Admin roles only
- **Reports**: All authenticated users
- **Audit Logs**: All authenticated users

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