export type Language = 'en' | 'es';

const en: Record<string, string> = {
  'greeting.title': 'Good morning! ☀️',
  'greeting.subtitle': 'Track your expenses in seconds. Stay in control.',

  'expense.title': 'Add expense',
  'expense.hint': 'Try: Coffee 4',
  'expense.namePlaceholder': 'What did you spend on?',
  'expense.categoryPlaceholder': 'Category',
  'expense.currencyFavorite': 'Favorite currency',
  'expense.add': 'Add',
  'expense.adding': 'Adding…',
  'expense.error': 'Failed to add expense. Please try again.',

  'actions.title': 'Quick actions',
  'actions.addIncome': 'Add income',
  'actions.manageTransactions': 'Manage transactions',

  'stats.totalExpenses': 'Total Expenses',
  'stats.totalIncome': 'Total Income',
  'stats.netBalance': 'Net Balance',
  'stats.transactions': 'Transactions',

  'transactions.title': 'Recent transactions',

  'banner.noSignup': 'No sign up required.',
  'banner.description': 'Access your data anywhere with your unique token.',
  'banner.learnHow': 'Learn how it works →',

  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',

  'security.title': '100% Secure',
  'security.description': 'Your data is encrypted and stored securely.',
  'security.learnMore': 'Learn more →',

  'token.label': 'Your access token',
  'token.tooltip': 'This is your personal token, you can use it to track your expenses in different devices, just copy paste and save in a notepad!',
  'token.copy': 'Copy to clipboard',
  'token.switchToken': 'Use a different token',
  'token.removeToken': 'Remove token from this device',
  'token.removeConfirm': 'Remove token from this device?',
  'token.remove': 'Remove',
  'token.cancel': 'Cancel',
  'token.apply': 'Apply',
  'token.notFound': 'Token not found. Please check and try again.',
  'token.placeholder': 'e.g. XXXX-XXXX-XXXX',

  // Period filter labels
  'period.week':    'Last week',
  'period.month':   'Last month',
  'period.quarter': 'Last quarter',
  'period.year':    'Last year',

  // Chart titles and internal labels
  'chart.expensesOverTime':   'Expenses over time',
  'chart.spendingByCategory': 'Spending by category',
  'chart.expenses':           'Expenses',
  'chart.total':              'Total',

  // Expense categories (display only — API stores the English value)
  'category.Food & Dining': 'Food & Dining',
  'category.Transport':     'Transport',
  'category.Shopping':      'Shopping',
  'category.Bills':         'Bills',
  'category.Entertainment': 'Entertainment',
  'category.Health':        'Health',
  'category.Education':     'Education',
  'category.Travel':        'Travel',
  'category.Subscriptions': 'Subscriptions',
  'category.Other':         'Other',

  // Income categories (display only)
  'incomeCategory.Salary':      'Salary',
  'incomeCategory.Freelance':   'Freelance',
  'incomeCategory.Business':    'Business',
  'incomeCategory.Investments': 'Investments',
  'incomeCategory.Rental':      'Rental',
  'incomeCategory.Dividends':   'Dividends',
  'incomeCategory.Bonus':       'Bonus',
  'incomeCategory.Gift':        'Gift',
  'incomeCategory.Pension':     'Pension',
  'incomeCategory.Benefits':    'Benefits',
  'incomeCategory.Other':       'Other',

  // Manage transactions modal
  'modal.manageTransactions': 'Manage transactions',
  'modal.loading':            'Loading…',
  'modal.tabExpenses':        'Expenses',
  'modal.tabIncomes':         'Incomes',
  'modal.noExpenses':         'No expenses recorded.',
  'modal.noIncomes':          'No incomes recorded.',
  'modal.delete':             'Delete',
  'modal.close':              'Close',

  // Add income modal
  'income.addIncome':          'Add income',
  'income.source':             'Source',
  'income.sourcePlaceholder':  'e.g. Salary, Freelance, Bonus…',
  'income.amount':             'Amount',
  'income.currency':           'Currency',
  'income.category':           'Category',
  'income.categoryOptional':   '(optional)',
  'income.none':               'None',
  'income.date':               'Date',
  'income.cancel':             'Cancel',
  'income.adding':             'Adding…',
  'income.add':                'Add income',
  'income.error':              'Failed to add income. Please try again.',

  // Privacy modal
  'privacy.title':            'Privacy Policy',
  'privacy.lastUpdated':      'Last updated May 2025',
  'privacy.collectTitle':     'What we collect',
  'privacy.collectBody':      'We store your encrypted financial records (names, amounts, currencies, categories, and dates) and an anonymous access token. All financial fields are encrypted with AES-256-CBC before reaching our database. We do not collect your name, email address, or any other personally identifiable information.',
  'privacy.dontCollectTitle': "What we don't collect",
  'privacy.dontCollectBody':  'We do not use tracking cookies, advertising pixels, or analytics that identify you personally. We do not sell, share, or disclose your data to third parties for any commercial purpose.',
  'privacy.securityTitle':    'Data security',
  'privacy.securityBody':     'Your data is encrypted at rest using AES-256-CBC with a unique initialization vector per field. Access is gated by your anonymous token, which is verified via a one-way SHA-256 hash — the raw token is never stored in plaintext.',
  'privacy.rightsTitle':      'Your rights',
  'privacy.rightsBody':       'You can delete any transaction at any time from the Manage Transactions panel. Because there is no account linked to an email address, we are unable to identify or retrieve data on your behalf — your token is the only key to your records.',

  // Terms modal
  'terms.title':              'Terms of Service',
  'terms.lastUpdated':        'Last updated May 2025',
  'terms.acceptanceTitle':    'Acceptance',
  'terms.acceptanceBody':     'By using Mervane you agree to these terms. If you do not agree, please discontinue use. We reserve the right to update these terms at any time; continued use constitutes acceptance of any changes.',
  'terms.tokenTitle':         'Token responsibility',
  'terms.tokenBody':          'Your access token is your sole credential. You are responsible for keeping it confidential. We cannot recover a lost token or identify who owns a given set of data. Any action taken with your token is your responsibility.',
  'terms.warrantyTitle':      'No warranty',
  'terms.warrantyBody':       'Mervane is provided "as is" without warranty of any kind. We do not guarantee uninterrupted availability, error-free operation, or the permanent retention of your data. Use the service at your own risk.',
  'terms.acceptableUseTitle': 'Acceptable use',
  'terms.acceptableUseBody':  'Mervane is intended for personal finance tracking only. You may not use the service for unlawful purposes, attempt to reverse-engineer the encryption, or interfere with the security or availability of the platform.',
};

const es: Record<string, string> = {
  'greeting.title': '¡Buenos días! ☀️',
  'greeting.subtitle': 'Registra tus gastos en segundos. Mantén el control.',

  'expense.title': 'Agregar gasto',
  'expense.hint': 'Prueba: Café 4',
  'expense.namePlaceholder': '¿En qué gastaste?',
  'expense.categoryPlaceholder': 'Categoría',
  'expense.currencyFavorite': 'Moneda favorita',
  'expense.add': 'Agregar',
  'expense.adding': 'Agregando…',
  'expense.error': 'Error al agregar el gasto. Inténtalo de nuevo.',

  'actions.title': 'Acciones rápidas',
  'actions.addIncome': 'Agregar ingreso',
  'actions.manageTransactions': 'Gestionar transacciones',

  'stats.totalExpenses': 'Gastos totales',
  'stats.totalIncome': 'Ingresos totales',
  'stats.netBalance': 'Balance neto',
  'stats.transactions': 'Transacciones',

  'transactions.title': 'Transacciones recientes',

  'banner.noSignup': 'Sin registro requerido.',
  'banner.description': 'Accede a tus datos desde cualquier lugar con tu token único.',
  'banner.learnHow': '¿Cómo funciona? →',

  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',

  'security.title': '100% Seguro',
  'security.description': 'Tus datos están cifrados y almacenados de forma segura.',
  'security.learnMore': 'Más información →',

  'token.label': 'Tu token de acceso',
  'token.tooltip': '¡Este es tu token personal! Úsalo para rastrear tus gastos en diferentes dispositivos. ¡Cópialo y guárdalo en un bloc de notas!',
  'token.copy': 'Copiar al portapapeles',
  'token.switchToken': 'Usar un token diferente',
  'token.removeToken': 'Eliminar token de este dispositivo',
  'token.removeConfirm': '¿Eliminar token de este dispositivo?',
  'token.remove': 'Eliminar',
  'token.cancel': 'Cancelar',
  'token.apply': 'Aplicar',
  'token.notFound': 'Token no encontrado. Por favor verifica e intenta de nuevo.',
  'token.placeholder': 'ej. XXXX-XXXX-XXXX',

  // Period filter labels
  'period.week':    'Última semana',
  'period.month':   'Último mes',
  'period.quarter': 'Último trimestre',
  'period.year':    'Último año',

  // Chart titles and internal labels
  'chart.expensesOverTime':   'Gastos a lo largo del tiempo',
  'chart.spendingByCategory': 'Gastos por categoría',
  'chart.expenses':           'Gastos',
  'chart.total':              'Total',

  // Expense categories (display only — API stores the English value)
  'category.Food & Dining': 'Comida y restaurantes',
  'category.Transport':     'Transporte',
  'category.Shopping':      'Compras',
  'category.Bills':         'Facturas',
  'category.Entertainment': 'Entretenimiento',
  'category.Health':        'Salud',
  'category.Education':     'Educación',
  'category.Travel':        'Viajes',
  'category.Subscriptions': 'Suscripciones',
  'category.Other':         'Otro',

  // Income categories (display only)
  'incomeCategory.Salary':      'Salario',
  'incomeCategory.Freelance':   'Freelance',
  'incomeCategory.Business':    'Negocio',
  'incomeCategory.Investments': 'Inversiones',
  'incomeCategory.Rental':      'Renta',
  'incomeCategory.Dividends':   'Dividendos',
  'incomeCategory.Bonus':       'Bono',
  'incomeCategory.Gift':        'Regalo',
  'incomeCategory.Pension':     'Pensión',
  'incomeCategory.Benefits':    'Beneficios',
  'incomeCategory.Other':       'Otro',

  // Manage transactions modal
  'modal.manageTransactions': 'Gestionar transacciones',
  'modal.loading':            'Cargando…',
  'modal.tabExpenses':        'Gastos',
  'modal.tabIncomes':         'Ingresos',
  'modal.noExpenses':         'Sin gastos registrados.',
  'modal.noIncomes':          'Sin ingresos registrados.',
  'modal.delete':             'Eliminar',
  'modal.close':              'Cerrar',

  // Add income modal
  'income.addIncome':         'Agregar ingreso',
  'income.source':            'Fuente',
  'income.sourcePlaceholder': 'ej. Salario, Freelance, Bono…',
  'income.amount':            'Monto',
  'income.currency':          'Moneda',
  'income.category':          'Categoría',
  'income.categoryOptional':  '(opcional)',
  'income.none':              'Ninguna',
  'income.date':              'Fecha',
  'income.cancel':            'Cancelar',
  'income.adding':            'Agregando…',
  'income.add':               'Agregar ingreso',
  'income.error':             'Error al agregar el ingreso. Inténtalo de nuevo.',

  // Privacy modal
  'privacy.title':            'Política de privacidad',
  'privacy.lastUpdated':      'Última actualización mayo 2025',
  'privacy.collectTitle':     'Qué recopilamos',
  'privacy.collectBody':      'Almacenamos tus registros financieros cifrados (nombres, montos, monedas, categorías y fechas) y un token de acceso anónimo. Todos los campos financieros se cifran con AES-256-CBC antes de llegar a nuestra base de datos. No recopilamos tu nombre, dirección de correo electrónico ni ninguna otra información de identificación personal.',
  'privacy.dontCollectTitle': 'Qué no recopilamos',
  'privacy.dontCollectBody':  'No usamos cookies de seguimiento, píxeles publicitarios ni análisis que te identifiquen personalmente. No vendemos, compartimos ni divulgamos tus datos a terceros con ningún propósito comercial.',
  'privacy.securityTitle':    'Seguridad de datos',
  'privacy.securityBody':     'Tus datos están cifrados en reposo con AES-256-CBC y un vector de inicialización único por campo. El acceso está protegido por tu token anónimo, que se verifica mediante un hash SHA-256 unidireccional; el token en texto plano nunca se almacena.',
  'privacy.rightsTitle':      'Tus derechos',
  'privacy.rightsBody':       'Puedes eliminar cualquier transacción en cualquier momento desde el panel de Gestionar transacciones. Como no hay ninguna cuenta vinculada a un correo electrónico, no podemos identificar ni recuperar datos en tu nombre; tu token es la única clave de tus registros.',

  // Terms modal
  'terms.title':              'Términos de servicio',
  'terms.lastUpdated':        'Última actualización mayo 2025',
  'terms.acceptanceTitle':    'Aceptación',
  'terms.acceptanceBody':     'Al usar Mervane aceptas estos términos. Si no estás de acuerdo, por favor deja de usar el servicio. Nos reservamos el derecho de actualizar estos términos en cualquier momento; el uso continuado constituye la aceptación de los cambios.',
  'terms.tokenTitle':         'Responsabilidad del token',
  'terms.tokenBody':          'Tu token de acceso es tu única credencial. Eres responsable de mantenerlo confidencial. No podemos recuperar un token perdido ni identificar al propietario de un conjunto de datos. Cualquier acción realizada con tu token es tu responsabilidad.',
  'terms.warrantyTitle':      'Sin garantía',
  'terms.warrantyBody':       'Mervane se proporciona "tal cual" sin garantía de ningún tipo. No garantizamos disponibilidad ininterrumpida, operación sin errores ni la retención permanente de tus datos. Usa el servicio bajo tu propio riesgo.',
  'terms.acceptableUseTitle': 'Uso aceptable',
  'terms.acceptableUseBody':  'Mervane está diseñado exclusivamente para el seguimiento de finanzas personales. No puedes usar el servicio con fines ilegales, intentar realizar ingeniería inversa del cifrado ni interferir con la seguridad o disponibilidad de la plataforma.',
};

export const TRANSLATIONS: Record<Language, Record<string, string>> = { en, es };
