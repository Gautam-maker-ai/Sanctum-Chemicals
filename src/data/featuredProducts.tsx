import ParacetamolImg from '../assets/products/Paracetmol Tablets 500mg.jpeg';
import IbuProfenImg from '../assets/products/IbuProfen 200mg.jpeg';
import AmoxicillinImg from '../assets/products/AmoxicillinImg.jpeg';

export const featuredProducts = [
  {
    id: 'paracetamol-500',
    name: 'Paracetamol 500mg',
    description: 'Effective pain relief and fever reducer.',
    price: 5.99,
    image: ParacetamolImg,
    prescription_required: false,
  },
  {
    id: 'ibuprofen-400',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain reliever.',
    price: 7.99,
    image: IbuProfenImg,
    prescription_required: false,
  },
  {
    id: 'amoxicillin-500',
    name: 'Amoxicillin 500mg',
    description: 'Broad-spectrum antibiotic.',
    price: 12.99,
    image: AmoxicillinImg,
    prescription_required: true,
  },
];