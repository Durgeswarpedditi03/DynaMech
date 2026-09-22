import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ServiceCard({ title, description, icon, accent }) {
  const Icon = Icons[icon] || Icons.Wrench;

  return (
    <motion.article
      className={`info-card accent-${accent}`}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className="icon-wrap"><Icon size={22} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  );
}
