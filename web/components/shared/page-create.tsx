import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui";
import { LucideIcon } from "lucide-react";

interface PageCreateProps {
  
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

function PageCreate({
  title,
  description,
  icon: Icon,
  children,
}: PageCreateProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <header className="space-y-3 pb-6 md:pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl flex items-center">
          {Icon && (
            <Icon className="w-9 h-9 mr-4 text-(--color-primary) shrink-0" />
          )}
          {title}
        </h1>

        {description && (
          <p className="text-lg text-(--color-muted-foreground) max-w-3xl">
            {description}
          </p>
        )}

        <Separator />
      </header>

      <main className="space-y-8">{children}</main>
    </div>
  );
}

export { PageCreate };
