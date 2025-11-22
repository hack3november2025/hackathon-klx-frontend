// /home/hack3-vl03-user/KLx/hackathon-klx-frontend/web/src/components/PageCreate.tsx
import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Separator } from "@/src/components/ui";
import { LucideIcon } from "lucide-react";

interface PageCreateProps {
  /** O título principal da página. (Obrigatório) */
  title: string;
  /** Uma breve descrição ou subtítulo. (Opcional) */
  description?: string;
  /** O ícone a ser exibido ao lado do título (use componentes do lucide-react). (Opcional) */
  icon?: LucideIcon;
  /** O conteúdo principal da página. (Obrigatório) */
  children: React.ReactNode;
}

/**
 * Componente de layout padrão para todas as páginas do aplicativo.
 * Garante um header consistente (título, descrição, ícone) e um container centralizado.
 */
function PageCreate({
  title,
  description,
  icon: Icon,
  children,
}: PageCreateProps) {
  return (
    // Container principal: centralizado, responsivo e com padding
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      {/* Header da Página */}
      <header className="space-y-3 pb-6 md:pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl flex items-center">
          {/* Ícone opcional */}
          {Icon && (
            <Icon className="w-9 h-9 mr-4 text-blue-600 shrink-0" />
          )}
          {title}
        </h1>

        {/* Descrição opcional */}
        {description && (
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
            {description}
          </p>
        )}

        <Separator />
      </header>

      {/* Conteúdo Principal (children) */}
      <main className="space-y-8">{children}</main>
    </div>
  );
}

export { PageCreate };
