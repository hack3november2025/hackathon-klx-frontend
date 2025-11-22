import Link from "next/link";
import { CardComponent } from "./card-component";

function NavigationCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link href={href}>
      <CardComponent title={title} description={description} icon={Icon} />
    </Link>
  );
}

export { NavigationCard };
