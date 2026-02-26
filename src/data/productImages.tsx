import ParacetamolImg from '../assets/products/Paracetmol Tablets 500mg.jpeg';
import IbuprofenImg from '../assets/products/IbuProfen 200mg.jpeg';
import AmoxicillinImg from '../assets/products/AmoxicillinImg.jpeg';
import AzithromycinImg from '../assets/products/Azithromycin.jpeg';
import VitaminDImg from '../assets/products/VitaminD.jpeg';
import MultivitaminImg from '../assets/products/Multivitamin.jpeg';
import Omega3Img from '../assets/products/Omega3.jpeg';
import AmlodipineImg from '../assets/products/Amlodipine.jpeg';
import AtorvastatinImg from '../assets/products/Atorvastatin.jpeg';
import MetforminImg from '../assets/products/Metformin.jpeg'
import InsulinGlargineImg from '../assets/products/InsulinGlargine.jpeg'
import SalbutamolInhalerImg from '../assets/products/SalbutamolInhaler.jpeg'
import CetirizineImg from '../assets/products/Cetirizine.jpeg'
import LoratadineImg from '../assets/products/Loratadin.jpeg'

export const productImagesByName: Record<string, string> = {
  'Paracetamol 500mg': ParacetamolImg,
  'Ibuprofen 400mg': IbuprofenImg,
  'Amoxicillin 500mg': AmoxicillinImg,
  'Azithromycin 250mg': AzithromycinImg,
  'Vitamin D3 1000 IU': VitaminDImg,
  'Multivitamin Complex': MultivitaminImg,
  'Omega-3 Fish Oil': Omega3Img,
  'Amlodipine 5mg': AmlodipineImg,
  'Atorvastatin 20mg': AtorvastatinImg,
  'Metformin 500mg': MetforminImg,
  'Insulin Glargine': InsulinGlargineImg,
  'Salbutamol Inhaler': SalbutamolInhalerImg,
  'Cetirizine 10mg': CetirizineImg,
  'Loratadine 10mg': LoratadineImg,
};

export const fallbackImage = ParacetamolImg;