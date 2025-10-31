import Image from 'next/image';
import styles from './StatCard.module.css';

export default function StatCard({ icon, iconClass, value, label }) {
  return (
    <article className={styles.statCard}>
      <span className={`${styles.statIcon} ${iconClass || ''}`}>
        <Image 
          src={icon} 
          alt={label} 
          width={24} 
          height={24}
          className={styles.iconImg}
          style={{ objectFit: 'contain' }}
        />
      </span>
      <section className={styles.statContent}>
        <h3>{value}</h3>
        <p>{label}</p>
      </section>
    </article>
  );
}
