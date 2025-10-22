import Image from 'next/image';

export default function StatCard({ icon, iconClass, value, label }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${iconClass}`}>
        <Image 
          src={icon} 
          alt={label} 
          width={24} 
          height={24}
          className="icon-img"
          style={{ objectFit: 'contain' }}
        />
      </span>
      <section className="stat-content">
        <h3>{value}</h3>
        <p>{label}</p>
      </section>
    </article>
  );
}