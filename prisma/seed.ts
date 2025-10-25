import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed opportunities (Arabic source of truth with English mirrors)
  const opportunities = [
    {
      slug: 'renewable-energy-solar-microgrid-kenya',
      title_ar: 'شبكات طاقة شمسية مصغرة للمجتمعات',
      title_en: 'Community Solar Microgrids',
      summary_ar: 'حل طاقة متجددة للمناطق الريفية يدعم الوصول للطاقة النظيفة.',
      summary_en: 'Renewable energy solution for rural areas enabling clean energy access.',
      sector: 'energy',
      country: 'KE',
      ticketMinUSD: 500000,
      ticketMaxUSD: 2000000,
      stage: 'growth',
      sdgs: ['SDG7', 'SDG13', 'SDG8'],
      esgScore: 78,
      heroImage: '/images/opportunities/solar.jpg',
      documents: [],
    },
    {
      slug: 'agri-value-chain-modernization-ghana',
      title_ar: 'تحديث سلاسل القيمة الزراعية',
      title_en: 'Agricultural Value Chain Modernization',
      summary_ar: 'برنامج شامل لرفع الإنتاجية واللوجستيات في الزراعة.',
      summary_en: 'Comprehensive program to enhance productivity and logistics in agriculture.',
      sector: 'agriculture',
      country: 'GH',
      ticketMinUSD: 300000,
      ticketMaxUSD: 1500000,
      stage: 'seed',
      sdgs: ['SDG2', 'SDG9', 'SDG12'],
      esgScore: 74,
      heroImage: '/images/opportunities/agri.jpg',
      documents: [],
    },
    {
      slug: 'healthcare-digital-clinics-nigeria',
      title_ar: 'عيادات رقمية مجتمعية',
      title_en: 'Community Digital Clinics',
      summary_ar: 'حلول صحية رقمية لدعم الوصول للرعاية الأساسية.',
      summary_en: 'Digital health solutions to improve access to primary care.',
      sector: 'healthcare',
      country: 'NG',
      ticketMinUSD: 200000,
      ticketMaxUSD: 1000000,
      stage: 'pilot',
      sdgs: ['SDG3', 'SDG9'],
      esgScore: 70,
      heroImage: '/images/opportunities/health.jpg',
      documents: [],
    },
    {
      slug: 'education-edtech-platform-egypt',
      title_ar: 'منصة تعليمية رقمية',
      title_en: 'EdTech Learning Platform',
      summary_ar: 'منصة تعليمية تفاعلية تدعم المهارات العصرية.',
      summary_en: 'Interactive learning platform supporting modern skills.',
      sector: 'education',
      country: 'EG',
      ticketMinUSD: 150000,
      ticketMaxUSD: 800000,
      stage: 'seed',
      sdgs: ['SDG4', 'SDG9'],
      esgScore: 68,
      heroImage: '/images/opportunities/edtech.jpg',
      documents: [],
    },
    {
      slug: 'infrastructure-logistics-hub-morocco',
      title_ar: 'مركز لوجستي إقليمي',
      title_en: 'Regional Logistics Hub',
      summary_ar: 'تطوير بنية تحتية لوجستية لدعم التجارة العابرة للحدود.',
      summary_en: 'Logistics infrastructure to facilitate cross-border trade.',
      sector: 'infrastructure',
      country: 'MA',
      ticketMinUSD: 1000000,
      ticketMaxUSD: 5000000,
      stage: 'series-a',
      sdgs: ['SDG9', 'SDG8'],
      esgScore: 75,
      heroImage: '/images/opportunities/logistics.jpg',
      documents: [],
    },
    {
      slug: 'tourism-eco-resorts-tanzania',
      title_ar: 'منتجعات سياحية بيئية',
      title_en: 'Eco-friendly Tourism Resorts',
      summary_ar: 'تعزيز السياحة المستدامة مع حماية الموارد الطبيعية.',
      summary_en: 'Promoting sustainable tourism while preserving natural resources.',
      sector: 'tourism',
      country: 'TZ',
      ticketMinUSD: 400000,
      ticketMaxUSD: 2500000,
      stage: 'growth',
      sdgs: ['SDG8', 'SDG12', 'SDG15'],
      esgScore: 72,
      heroImage: '/images/opportunities/tourism.jpg',
      documents: [],
    },
  ]

  const partners = [
    { name: 'African Development Partner', type: 'PPP', country: 'EG', logoUrl: '', link: 'https://example.org' },
    { name: 'Global Green Capital', type: 'Equity', country: 'MA', logoUrl: '', link: 'https://example.org' },
    { name: 'Continental Trade Group', type: 'Trade', country: 'KE', logoUrl: '', link: 'https://example.org' },
  ]

  const countries = [
    {
      iso2: 'EG',
      name_ar: 'مصر',
      name_en: 'Egypt',
      summary: 'اقتصاد متنوع مع إمكانات كبيرة في الطاقة والتعليم.',
      indicators: [
        { key: 'GDP_USD_BN', value: 400 },
        { key: 'Population_M', value: 110 },
        { key: 'RenewableShare_%', value: 12 },
        { key: 'InternetPenetration_%', value: 75 },
        { key: 'FDI_USD_BN', value: 9 }
      ]
    },
    {
      iso2: 'NG',
      name_ar: 'نيجيريا',
      name_en: 'Nigeria',
      summary: 'مركز اقتصادي رئيسي مع تطور سريع في التكنولوجيا.',
      indicators: [
        { key: 'GDP_USD_BN', value: 470 },
        { key: 'Population_M', value: 220 },
        { key: 'RenewableShare_%', value: 10 },
        { key: 'InternetPenetration_%', value: 63 },
        { key: 'FDI_USD_BN', value: 6 }
      ]
    },
    {
      iso2: 'KE',
      name_ar: 'كينيا',
      name_en: 'Kenya',
      summary: 'رائد إقليمي في التكنولوجيا المالية والطاقة المتجددة.',
      indicators: [
        { key: 'GDP_USD_BN', value: 115 },
        { key: 'Population_M', value: 54 },
        { key: 'RenewableShare_%', value: 80 },
        { key: 'InternetPenetration_%', value: 42 },
        { key: 'FDI_USD_BN', value: 1.1 }
      ]
    }
  ]

  const news = [
    {
      slug: 'strategic-africa-trade-power',
      title_ar: 'القوة التجارية لأفريقيا الحديثة',
      title_en: 'The Trade Power of Modern Africa',
      body_ar: 'تحليل حديث حول فرص التجارة المتقدمة في أفريقيا.',
      body_en: 'A recent analysis on advanced trade opportunities in Africa.',
      published_at: new Date(),
    },
    {
      slug: 'esg-commitment-africa',
      title_ar: 'التزام ESG في أفريقيا',
      title_en: 'ESG Commitment in Africa',
      body_ar: 'حوكمة وشفافية تدعم التنمية المستدامة.',
      body_en: 'Governance and transparency supporting sustainable development.',
      published_at: new Date(),
    },
    {
      slug: 'ppp-opportunities-key-sectors',
      title_ar: 'فرص الشراكات في القطاعات الرئيسية',
      title_en: 'PPP Opportunities in Key Sectors',
      body_ar: 'الزراعة، الصناعة، الطاقة، الصحة، التعليم، السياحة، النقل، التكنولوجيا.',
      body_en: 'Agriculture, industry, energy, health, education, tourism, transport, technology.',
      published_at: new Date(),
    }
  ]

  for (const opp of opportunities) {
    await prisma.opportunity.upsert({
      where: { slug: opp.slug },
      update: {},
      create: opp,
    })
  }

  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }

  for (const c of countries) {
    await prisma.countryProfile.create({
      data: {
        iso2: c.iso2,
        name_ar: c.name_ar,
        name_en: c.name_en,
        summary: c.summary,
        indicators: c.indicators as any,
      }
    })
  }

  for (const n of news) {
    await prisma.newsPost.create({ data: n })
  }

  console.log('Seeded opportunities, partners, countries, and news.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })