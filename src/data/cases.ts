export interface DetailItem {
  label?: string;
  text: string;
}

export interface CaseData {
  kicker: string;
  title: string;
  description: string;
  detailList: DetailItem[];
  pdfHref: string;
  divided?: boolean;
  reverse?: boolean;
}

export const cases: CaseData[] = [
  {
    kicker: 'Asesoramiento & diseño de espacios',
    title: 'Equipamiento integral a medida — Lorena Z',
    description:
      'Propuesta de equipamiento integral para una casa completa, definiendo mobiliario y decoración por ambiente a partir de las necesidades del cliente.',
    detailList: [
      { label: 'Living', text: 'mueble modular, juego de mesas centro, sillones con funda en lienzo, alfombra.' },
      { label: 'Comedor', text: 'mesa, estantería, sillas, lámparas.' },
      { label: 'Cocina', text: 'mesa y sillas.' },
      { label: 'Decoración', text: 'almohadones en tonos tierra, mantas, canastos con plantas, espejo, cuadros.' },
    ],
    pdfHref: 'https://drive.google.com/file/d/1wcARD7G0tWEzn7hbzZ1wzMjbfIFiF57U/view?usp=drive_link',
  },
  {
    kicker: 'Diseño de experiencia & evento de marca',
    title: 'Campo de Flores — Lanzamiento temporada Casa Chula',
    description:
      'Participación en evento de Jardinería en Campo de Flores: diseño y armado de espacios de living exterior para más de 300 asistentes, con foco en la experiencia del visitante, unión entre el paisaje y la propuesta.',
    detailList: [
      { text: 'Livings de exterior en el ingreso del espacio propuestos para su uso.' },
      { text: 'Nuevo modelo de barra rústico con frappera, acompañado de banquetas, armado en el vivero planteado para que la gente recorra.' },
      { text: 'Mesitas redondas con sillas para rincones de estar.' },
      { text: 'Coordinación de armado, desarmado y plan de contingencia por lluvia.' },
    ],
    pdfHref: 'https://drive.google.com/file/d/1cmK75VvNui8UN4zIhWVL-l7ESL_wj_dW/view?usp=drive_link',
    divided: true,
    reverse: true,
  },
];
