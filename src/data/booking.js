// Données factices de la maquette — réseau de 8 cliniques + services + créneaux.

export const CLINICS = [
  { id: 'plateau', name: 'VétéSoin Plateau', area: 'Le Plateau-Mont-Royal', distance: '1,2 km' },
  { id: 'rosemont', name: 'VétéSoin Rosemont', area: 'Rosemont–La Petite-Patrie', distance: '2,4 km' },
  { id: 'verdun', name: 'VétéSoin Verdun', area: 'Verdun', distance: '3,1 km' },
  { id: 'ahuntsic', name: 'VétéSoin Ahuntsic', area: 'Ahuntsic-Cartierville', distance: '4,0 km' },
  { id: 'westmount', name: 'VétéSoin Westmount', area: 'Westmount', distance: '4,6 km' },
  { id: 'longueuil', name: 'VétéSoin Longueuil', area: 'Longueuil', distance: '6,8 km' },
  { id: 'laval', name: 'VétéSoin Laval', area: 'Laval', distance: '9,2 km' },
  { id: 'brossard', name: 'VétéSoin Brossard', area: 'Brossard', distance: '11,5 km' },
]

export const SERVICES = [
  { id: 'consultation', label: 'Consultation', icon: '🩺', desc: 'Examen général ou problème de santé' },
  { id: 'vaccin', label: 'Vaccination', icon: '💉', desc: 'Vaccins et rappels' },
  { id: 'prescription', label: 'Renouvellement', icon: '💊', desc: 'Renouveler une prescription' },
  { id: 'toilettage', label: 'Toilettage', icon: '✂️', desc: 'Bain, coupe, soins' },
]

// Relie le motif qualifié par le chatbot à un service présélectionné.
export const REASON_TO_SERVICE = {
  'une consultation': 'consultation',
  'un vaccin': 'vaccin',
  'un renouvellement': 'prescription',
}

export const DAYS = [
  { id: 'd1', weekday: 'Lun.', day: '16', month: 'juin' },
  { id: 'd2', weekday: 'Mar.', day: '17', month: 'juin' },
  { id: 'd3', weekday: 'Mer.', day: '18', month: 'juin' },
  { id: 'd4', weekday: 'Jeu.', day: '19', month: 'juin' },
  { id: 'd5', weekday: 'Ven.', day: '20', month: 'juin' },
]

export const SLOTS = ['9:00', '9:45', '10:30', '11:15', '13:30', '14:15', '15:00', '16:30']
