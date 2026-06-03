interface ServiceCardProps {
  title: string;
  desc: string;
}

export default function ServiceCard({ title, desc }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="font-serif font-bold text-base mb-3 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}
