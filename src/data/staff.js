// Équipe de la réception + règles d'acheminement du chatbot.
// Chaque motif qualifié est orienté vers UNE personne avec UN rôle clair.

export const STAFF = {
  iris: {
    id: 'iris',
    name: 'Iris Bouchard',
    role: 'Responsable réception',
    emoji: '🗂️',
    tint: 'bg-sky-100 text-sky-700',
  },
  justine: {
    id: 'justine',
    name: 'Justine Lavoie',
    role: 'Technicienne en santé animale',
    emoji: '🩺',
    tint: 'bg-brand-100 text-brand-700',
  },
  salome: {
    id: 'salome',
    name: 'Dre Salomé Mercier',
    role: 'Vétérinaire',
    emoji: '🐾',
    tint: 'bg-amber-100 text-amber-700',
  },
}

// Motif (qualifié par le chatbot) -> destinataire + justification de l'acheminement.
const ROUTING = {
  'une consultation': { staff: 'salome', why: 'Consultation médicale → vétérinaire' },
  'un vaccin': { staff: 'justine', why: 'Vaccin/rappel → technicienne en santé animale' },
  'un renouvellement': { staff: 'iris', why: 'Renouvellement → réception (validation dossier)' },
}

const HUMAN_ROUTE = { staff: 'iris', why: 'Demande de contact humain → réception' }

/** Retourne { staff, why } pour un motif donné (défaut: réception). */
export function routeFor(reason) {
  const r = ROUTING[reason] ?? HUMAN_ROUTE
  return { staff: STAFF[r.staff], why: r.why }
}

export const HUMAN_ROUTING = { staff: STAFF[HUMAN_ROUTE.staff], why: HUMAN_ROUTE.why }

export const STATUS = {
  new: { label: 'Nouveau', dot: 'bg-rose-500', chip: 'bg-rose-50 text-rose-700' },
  assigned: { label: 'Assigné', dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-700' },
  in_progress: { label: 'En cours', dot: 'bg-sky-500', chip: 'bg-sky-50 text-sky-700' },
  done: { label: 'Traité', dot: 'bg-brand-500', chip: 'bg-brand-50 text-brand-700' },
}

// Demandes pré-existantes pour peupler la console (la démo y ajoute les nouvelles).
export const SEED_REQUESTS = [
  {
    id: 'seed-1',
    client: 'Sophie Lavigne',
    animal: 'Chien — Biscuit',
    motif: 'Consultation',
    why: 'Consultation médicale → vétérinaire',
    staffId: 'salome',
    status: 'in_progress',
    time: 'Il y a 14 min',
    channel: 'Assistant',
  },
  {
    id: 'seed-2',
    client: 'Karl Dubé',
    animal: 'Chat — Pacha',
    motif: 'Renouvellement de prescription',
    why: 'Renouvellement → réception (validation dossier)',
    staffId: 'iris',
    status: 'assigned',
    time: 'Il y a 31 min',
    channel: 'Assistant',
  },
  {
    id: 'seed-3',
    client: 'Émilie Roy',
    animal: 'Chien — Naya',
    motif: 'Question — horaires d’ouverture',
    why: 'Question générale → réception',
    staffId: 'iris',
    status: 'done',
    time: 'Il y a 1 h',
    channel: 'Assistant',
  },
  {
    id: 'seed-4',
    client: 'Antoine Girard',
    animal: 'Chat — Loki',
    motif: 'Vaccin',
    why: 'Vaccin/rappel → technicienne en santé animale',
    staffId: 'justine',
    status: 'done',
    time: 'Il y a 2 h',
    channel: 'Assistant',
  },
]
