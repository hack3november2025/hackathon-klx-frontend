import { Card, CardContent, CardHeader, CardTitle } from "@/components";
import { MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

function ChatResponseDisplay({ answer }: { answer: string }) {
  // Simples componente para exibir a resposta da IA em formato Markdown
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-primary" />
          AI Response & Candidate Match
        </CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none dark:prose-invert">
        {/* Renderiza a resposta da IA como Markdown */}
        <ReactMarkdown>{answer}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}

export { ChatResponseDisplay };
