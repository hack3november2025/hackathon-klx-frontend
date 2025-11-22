import { useMemo } from "react";
import { CardComponent } from "./card-component";

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  iconColorClass,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  iconColorClass: string;
}) {
  const content = useMemo(() => {
    return (
      <>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </>
    );
  }, []);
  return (
    <CardComponent
      title={title}
      icon={Icon}
      content={content}
      iconColorClass={iconColorClass}
    />
  );
}

export { MetricCard };
