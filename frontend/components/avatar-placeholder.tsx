interface AvatarPlaceholderProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AvatarPlaceholder({
  initials,
  size = 'md',
}: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const colors = [
    'bg-primary/20 text-primary',
    'bg-accent/20 text-accent',
    'bg-blue-500/20 text-blue-400',
    'bg-purple-500/20 text-purple-400',
    'bg-emerald-500/20 text-emerald-400',
    'bg-amber-500/20 text-amber-400',
  ];

  const colorIndex = initials.charCodeAt(0) % colors.length;

  return (
    <div
      className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
