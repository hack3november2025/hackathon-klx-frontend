import { cn } from "@/src/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import React from "react";

interface CardComponenProps {
  className?: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  iconColorClass?: string;
  content?: React.ReactNode;
}

function CardComponent({
  className,
  title,
  description,
  icon: Icon,
  iconColorClass,
  content,
}: CardComponenProps) {
  return (
    <Card className={className}>
      <CardHeader
        className={cn(
          "flex flex-row items-center space-y-0 pb-2",
          `${Icon ? " justify-between " : "justify-center"} `
        )}
      >
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        {Icon
          ? React.createElement(Icon, {
              className: cn("h-4 w-4 text-muted-foreground", iconColorClass),
            })
          : null}

        {description ? <CardDescription>{description} </CardDescription> : null}
      </CardHeader>
      {content ? <CardContent>{content}</CardContent> : null}
    </Card>
  );
}

export { CardComponent };
