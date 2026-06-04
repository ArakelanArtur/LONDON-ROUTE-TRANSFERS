interface ServiceCardProps {
  title: string;
  desc: string;
}

export default function ServiceCard({ title, desc }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 p-6 rounded-sm">
      <div className="w-6 h-0.5 bg-[var(--brand-gold)] mb-4" />
      <h3 className="font-serif font-bold text-base mb-3 text-[var(--brand-navy)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </div>
  );
}
