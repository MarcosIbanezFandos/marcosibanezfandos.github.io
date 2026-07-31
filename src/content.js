// Single source of truth for the site copy (EN / ES).
// `theme` on each experience entry selects its bespoke animation.

const links = [
    { name: 'GitHub', url: 'https://github.com/MarcosIbanezFandos', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/marcos-ibanez/', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:marcosibanezfandos@gmail.com', icon: 'mail' },
];

const toolbox = [
    { group: 'Languages', tone: 'sky', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java'] },
    { group: 'Data & ML', tone: 'cyan', items: ['pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'LightGBM', 'Streamlit'] },
    { group: 'Analytics & BI', tone: 'teal', items: ['Power BI', 'Alteryx', 'Excel'] },
    { group: 'Web & App', tone: 'indigo', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
    { group: 'Backend & Data', tone: 'blue', items: ['FastAPI', 'PostgreSQL', 'Supabase', 'REST APIs', 'Java Servlets'] },
    { group: 'Cloud & Tooling', tone: 'violet', items: ['Docker', 'Vercel', 'AWS RDS', 'Git', 'GitHub Actions'] },
]

export const content = {
    en: {
        nav: {
            about: 'About',
            experience: 'Experience',
            projects: 'Projects',
            publications: 'Research',
            education: 'Education',
            certifications: 'Languages',
            volunteering: 'Volunteering',
        },
        ui: {
            status: 'Currently',
            statusValue: 'Transaction Pricing @ BMW Group · Munich',
            viewResume: 'View full résumé',
            privateRepo: 'Private repository',
            toolbox: 'Toolbox',
            present: 'Present',
            scroll: 'Scroll',
            builtWith: 'Built with React, Vite and Framer Motion. Type set in Inter.',
        },
        profile: {
            name: 'Marcos Ibáñez',
            role: 'Telecom Engineer · Data, Pricing & AI',
            tagline: 'An engineering foundation applied where technology meets business: pricing, data and AI.',
            about: [
                'My degree in Telecommunications Engineering gave me a rigorous technical foundation and a habit of breaking complex systems into parts I can reason about. Engineering trained the analytical side; curiosity pushed me toward the places where that thinking creates business impact.',
                'Since then I have been building in Data Science, financial markets and applied AI — from a cost-sensitive fraud detection model to a portfolio rebalancing app I use myself. Right now I am an intern at BMW Group in Munich, where I help connect business needs with the people who build the tools, and automate parts of our processes with AI.',
            ],
            links,
            toolbox,
        },
        experience: [
            {
                theme: 'bmw',
                dates: 'Mar 2026 — Present',
                title: 'Transaction Pricing · Intern',
                company: 'BMW Group',
                location: 'Munich, Germany',
                link: 'https://www.bmwgroup.com',
                description:
                    'Supporting the Transaction Pricing team as a bridge between business stakeholders and developers: gathering requirements, keeping tasks moving and making sure both sides speak the same language. I also work on automating recurring processes with AI to save the team manual work.',
                skills: ['Project Management', 'Business & Dev liaison', 'Process Automation', 'AI Tooling', 'Pricing Data'],
            },
            {
                theme: 'pamesa',
                dates: '2023',
                title: 'Network Infrastructure Technician',
                company: 'Pamesa Ceramics',
                location: 'Castellón, Spain',
                link: 'https://www.pamesa.com/',
                description:
                    'Managed industrial networking infrastructure. Oversaw fiber optics installations and data room maintenance for high-availability manufacturing systems.',
                skills: ['Industrial Networking', 'Cybersecurity', 'Cisco', 'Fiber Optics'],
            },
            {
                theme: 'etra',
                dates: '2022',
                title: 'Data Software Development Intern',
                company: 'ETRA I+D',
                location: 'Valencia, Spain',
                link: 'https://www.grupoetra.com',
                description:
                    'Analyzed complex datasets using SQL and Python to drive strategic decisions. Built automated ETL pipelines and visualized key performance indicators using Power BI and Alteryx.',
                skills: ['SQL', 'C#', 'Power BI', 'Alteryx'],
            },
        ],
        projects: [
            {
                theme: 'fandance',
                title: 'Fandance — Index Portfolio Rebalancer (PWA)',
                description:
                    'A full-stack progressive web app that automates passive portfolio management. It computes the exact monthly contribution to allocate across each fund to converge on a target asset allocation, applying the cash-flow rebalancing methodology used by robo-advisors. Includes an ETF look-through engine that resolves underlying holdings into real exposure by company, country and currency, benchmarking against major indices, and money-weighted return (IRR) derived from imported transaction history.',
                link: 'https://github.com/MarcosIbanezFandos/Fandance-PWA',
                live: 'https://fandance-pwa.vercel.app',
                tech: ['React', 'FastAPI', 'Supabase', 'Vercel', 'yfinance', 'PWA'],
            },
            {
                theme: 'fraud',
                title: 'Credit Card Fraud Detection',
                description:
                    'A cost-sensitive Random Forest focused on minimizing financial impact rather than raw accuracy. Applies probability calibration and threshold optimization to balance precision, recall and operational cost.',
                link: 'https://github.com/MarcosIbanezFandos/Credit-Card-Fraud-Detection',
                tech: ['Python', 'scikit-learn', 'Streamlit', 'ML'],
            },
            {
                theme: 'oca',
                title: 'Game of the Goose — Multiplayer Web Edition',
                description:
                    'University group project: a browser-based multiplayer implementation of the classic Spanish board game. Server-side game logic and turn validation run on Java Servlets, with match state persisted in AWS RDS so several players share a synchronised board. Containerised with Docker and deployed to Railway.',
                link: 'https://github.com/MarcosIbanezFandos/ProyectoOca',
                tech: ['Java Servlets', 'JavaScript', 'AWS RDS', 'Docker', 'Tomcat'],
            },
        ],
        publications: [
            {
                theme: 'thesis',
                title: 'Bachelor Thesis — Fraud Detection in Fintech Transactions using Artificial Intelligence',
                publisher: 'Universitat Politècnica de València',
                year: '2025',
                description:
                    'End-to-end ML research on detecting fraudulent transactions with cost-sensitive learning to minimize economic impact.',
                link: 'Memoria_Entrega_Final_MarcosIbanez.pdf',
            },
            {
                theme: 'neural',
                title: 'Hybrid Neural Networks',
                publisher: 'Technical University of Munich',
                year: '2025',
                description:
                    'Seminar paper analyzing the combination of artificial and spiking neural models for neuromorphic chips (Tianjic), focused on energy efficiency in edge AI.',
                link: 'Hybrid_Neural Networks_Marcos Ibanez_2025.pdf',
            },
        ],
        education: [
            {
                logo: 'ie',
                school: 'IE University',
                degree: 'M.Sc. Business Analytics and Data Science',
                details: 'IE School of Science and Technology',
                city: 'Madrid',
            },
            {
                logo: 'tum',
                school: 'Technical University of Munich',
                degree: 'Erasmus+ Exchange',
                details: 'School of Computation, Information and Technology',
                city: 'Munich',
            },
            {
                logo: 'upv',
                school: 'Universitat Politècnica de València',
                degree: 'B.Sc. Telecommunications Engineering',
                details: 'Focus on Telematic Systems',
                city: 'Valencia',
            },
        ],
        certifications: [
            { code: 'es', title: 'Spanish — Native', issuer: '', year: '', level: 100 },
            { code: 'gb', title: 'English — C1 Advanced', issuer: 'Cambridge English', year: '2017', level: 85 },
            { code: 'fr', title: 'French — DELF B2', issuer: 'Institut français', year: '2019', level: 65 },
            { code: 'de', title: 'German — Goethe B1', issuer: 'Goethe-Institut e.V.', year: '2018', level: 45 },
            { code: 'va', title: 'Valencian — C1 (Grau Mitjà)', issuer: 'Junta Qualificadora de Coneixements de Valencià', year: '2024', level: 90 },
        ],
        volunteering: [
            {
                role: 'Community Development Volunteer',
                organization: 'Dream Africa Care Foundation',
                location: 'Accra, Ghana',
                dates: 'July 2024',
                description: 'Youth coaching and educational support to foster community development.',
            },
        ],
    },

    es: {
        nav: {
            about: 'Sobre mí',
            experience: 'Experiencia',
            projects: 'Proyectos',
            publications: 'Investigación',
            education: 'Educación',
            certifications: 'Idiomas',
            volunteering: 'Voluntariado',
        },
        ui: {
            status: 'Actualmente',
            statusValue: 'Transaction Pricing @ BMW Group · Múnich',
            viewResume: 'Ver CV completo',
            privateRepo: 'Repositorio privado',
            toolbox: 'Herramientas',
            present: 'Actualidad',
            scroll: 'Desliza',
            builtWith: 'Hecho con React, Vite y Framer Motion. Tipografía Inter.',
        },
        profile: {
            name: 'Marcos Ibáñez',
            role: 'Ingeniero de Teleco · Datos, Pricing e IA',
            tagline: 'Una base de ingeniería aplicada donde la tecnología se cruza con el negocio: pricing, datos e IA.',
            about: [
                'Mi grado en Ingeniería de Telecomunicaciones me dio una base técnica rigurosa y la costumbre de descomponer sistemas complejos en partes que puedo razonar. La ingeniería entrenó la parte analítica; la curiosidad me llevó hacia los sitios donde ese pensamiento genera impacto de negocio.',
                'Desde entonces he ido construyendo en Ciencia de Datos, mercados financieros e IA aplicada — desde un modelo de detección de fraude sensible al coste hasta una app de rebalanceo de carteras que uso yo mismo. Ahora estoy de prácticas en BMW Group en Múnich, donde ayudo a conectar las necesidades de negocio con quienes desarrollan las herramientas, y automatizo parte de nuestros procesos con IA.',
            ],
            links,
            toolbox,
        },
        experience: [
            {
                theme: 'bmw',
                dates: 'Mar 2026 — Actualidad',
                title: 'Transaction Pricing · Prácticas',
                company: 'BMW Group',
                location: 'Múnich, Alemania',
                link: 'https://www.bmwgroup.com',
                description:
                    'Apoyo al equipo de Transaction Pricing haciendo de puente entre negocio y desarrollo: recojo requisitos, ayudo a que las tareas avancen y a que ambas partes hablen el mismo idioma. También trabajo en automatizar procesos recurrentes con IA para ahorrarle trabajo manual al equipo.',
                skills: ['Gestión de proyectos', 'Puente negocio–desarrollo', 'Automatización de procesos', 'Herramientas de IA', 'Datos de pricing'],
            },
            {
                theme: 'pamesa',
                dates: '2023',
                title: 'Técnico en Instalaciones de Redes',
                company: 'Pamesa Cerámica',
                location: 'Castellón, España',
                link: 'https://www.pamesa.com/',
                description:
                    'Gestión de infraestructura de redes industriales. Supervisión de instalaciones de fibra óptica y mantenimiento de salas de datos para sistemas de fabricación de alta disponibilidad.',
                skills: ['Redes Industriales', 'Ciberseguridad', 'Cisco', 'Fibra Óptica'],
            },
            {
                theme: 'etra',
                dates: '2022',
                title: 'Ingeniero de Datos en Prácticas',
                company: 'ETRA I+D',
                location: 'Valencia, España',
                link: 'https://www.grupoetra.com',
                description:
                    'Análisis de conjuntos de datos complejos con SQL y Python para impulsar decisiones estratégicas. Construcción de pipelines ETL automatizados y visualización de indicadores clave con Power BI y Alteryx.',
                skills: ['SQL', 'C#', 'Power BI', 'Alteryx'],
            },
        ],
        projects: [
            {
                theme: 'fandance',
                title: 'Fandance — Rebalanceador de Carteras Indexadas (PWA)',
                description:
                    'Aplicación web progresiva full-stack que automatiza la gestión pasiva de carteras. Calcula la aportación mensual exacta a asignar a cada fondo para converger hacia una asignación objetivo, aplicando la metodología de rebalanceo por flujos de caja que emplean los robo-advisors. Incorpora un motor de look-through de ETFs que descompone las posiciones subyacentes en exposición real por empresa, país y divisa, comparación con los principales índices y cálculo de la rentabilidad ponderada por dinero (TIR) a partir del historial de transacciones importado.',
                link: 'https://github.com/MarcosIbanezFandos/Fandance-PWA',
                live: 'https://fandance-pwa.vercel.app',
                tech: ['React', 'FastAPI', 'Supabase', 'Vercel', 'yfinance', 'PWA'],
            },
            {
                theme: 'fraud',
                title: 'Detección de Fraude en Tarjetas',
                description:
                    'Un Random Forest sensible al coste, centrado en minimizar el impacto económico más que la precisión bruta. Aplica calibración de probabilidad y optimización de umbrales para equilibrar precisión, recall y coste operativo.',
                link: 'https://github.com/MarcosIbanezFandos/Credit-Card-Fraud-Detection',
                tech: ['Python', 'scikit-learn', 'Streamlit', 'ML'],
            },
            {
                theme: 'oca',
                title: 'Juego de la Oca — Edición Web Multijugador',
                description:
                    'Proyecto universitario en grupo: implementación multijugador del clásico juego de mesa en navegador. La lógica de partida y la validación de turnos se ejecutan en el servidor con Java Servlets, y el estado se persiste en AWS RDS para que varios jugadores compartan un tablero sincronizado. Contenerizado con Docker y desplegado en Railway.',
                link: 'https://github.com/MarcosIbanezFandos/ProyectoOca',
                tech: ['Java Servlets', 'JavaScript', 'AWS RDS', 'Docker', 'Tomcat'],
            },
        ],
        publications: [
            {
                theme: 'thesis',
                title: 'TFG — Detección de Fraude en Transacciones Fintech usando IA',
                publisher: 'Universitat Politècnica de València',
                year: '2025',
                description:
                    'Investigación de ML integral sobre detección de transacciones fraudulentas con aprendizaje sensible al coste para minimizar el impacto económico.',
                link: 'Memoria_Entrega_Final_MarcosIbanez.pdf',
            },
            {
                theme: 'neural',
                title: 'Redes Neuronales Híbridas',
                publisher: 'Technical University of Munich',
                year: '2025',
                description:
                    'Artículo de seminario que analiza la combinación de modelos neuronales artificiales y de picos para chips neuromórficos (Tianjic), centrado en la eficiencia energética en Edge AI.',
                link: 'Hybrid_Neural Networks_Marcos Ibanez_2025.pdf',
            },
        ],
        education: [
            {
                logo: 'ie',
                school: 'IE University',
                degree: 'Máster en Business Analytics y Data Science',
                details: 'IE School of Science and Technology',
                city: 'Madrid',
            },
            {
                logo: 'tum',
                school: 'Technical University of Munich',
                degree: 'Intercambio Erasmus+',
                details: 'Escuela de Computación, Información y Tecnología',
                city: 'Múnich',
            },
            {
                logo: 'upv',
                school: 'Universitat Politècnica de València',
                degree: 'Grado en Ingeniería de Telecomunicaciones',
                details: 'Mención en Sistemas Telemáticos',
                city: 'Valencia',
            },
        ],
        certifications: [
            { code: 'es', title: 'Español — Nativo', issuer: '', year: '', level: 100 },
            { code: 'gb', title: 'Inglés — C1 Advanced', issuer: 'Cambridge English', year: '2017', level: 85 },
            { code: 'fr', title: 'Francés — DELF B2', issuer: 'Institut français', year: '2019', level: 65 },
            { code: 'de', title: 'Alemán — Goethe B1', issuer: 'Goethe-Institut e.V.', year: '2018', level: 45 },
            { code: 'va', title: 'Valenciano — C1 (Grau Mitjà)', issuer: 'Junta Qualificadora de Coneixements de Valencià', year: '2024', level: 90 },
        ],
        volunteering: [
            {
                role: 'Voluntario de Desarrollo Comunitario',
                organization: 'Dream Africa Care Foundation',
                location: 'Accra, Ghana',
                dates: 'Julio 2024',
                description: 'Acompañamiento a jóvenes y apoyo educativo para impulsar el desarrollo de la comunidad.',
            },
        ],
    },
};

export const TOOLBOX_GROUPS_ES = {
    'Languages': 'Lenguajes',
    'Data & ML': 'Datos y ML',
    'Analytics & BI': 'Analítica y BI',
    'Web & App': 'Web y App',
    'Backend & Data': 'Backend y Datos',
    'Cloud & Tooling': 'Cloud y Herramientas',
};

export const RESUME = 'CV_MarcosIbanez_2026.pdf';
