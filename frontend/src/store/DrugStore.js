import { create } from 'zustand'

const drugsInitial = [
  {
    id: 1,
    name: 'Acetaminofen',
    description: '1 pastilla cada 8 horas',
    image: 'https://www.drogueriascafam.com.co/54345-large_default/acetaminofen-mk-500-mg-caja-con-16-tabletas-cubiertas.jpg',
    checked: false
  },
  {
    id: 2,
    name: 'Ibuprofeno',
    description: '1 pastilla cada 12 horas',
    image: 'https://www.drogueriasanjorge.com/wp-content/uploads/2012/04/image_vX.png',
    checked: false
  }
]

const DrugStore = create((set) => ({
  drugs: drugsInitial,
  addDrug: (drug) => set((state) => ({ drugs: [...state.drugs, drug] })),
  removeDrug: (id) => set((state) => ({ drugs: state.drugs.filter((drug) => drug.id !== id) })),
  checkDrug: (id) => set((state) => ({ drugs: state.drugs.map((drug) => drug.id === id ? { ...drug, checked: !drug.checked } : drug) })),
}))

export default DrugStore
