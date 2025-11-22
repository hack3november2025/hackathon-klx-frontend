"use client";

import { useForm, FormProvider } from "react-hook-form";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { PageCreate, LoadingSpinner } from "@/components/shared";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Badge,
} from "@/components/ui";
import { useChat } from "@/modules/chat/hooks/useChat";

import { cn } from "@/lib/utils";
import { ChatResponseDisplay } from "./componets/chat-response-display";

interface QueryForm {
  query: string;
}

export default function ChatPage() {
  const { answer, loading, handleQuery } = useChat();

  const form = useForm<QueryForm>({
    defaultValues: {
      query: "any java developers with more than 5 years of experience",
    },
  });

  const onSubmit = (data: QueryForm) => {
    handleQuery({ props: data });
  };

  return (
    <PageCreate
      title="Natural Language CV Search"
      description="Query your candidate database using natural language and receive an AI-generated match summary."
      icon={MessageSquare}
    >
      <Card>
        <CardHeader>
          <CardTitle>1. Enter your Query</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                rules={{ required: "A query is required." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., Find senior Python engineers skilled in FastAPI and Docker..."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="mt-4 w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Query to AI
                  </>
                )}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {loading && (
        <LoadingSpinner
          text="Vectorizing query and generating AI summary..."
          size="8"
          colorClass="text-primary"
          className="h-40"
        />
      )}

      {answer && answer.answer && !loading && (
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">2. Analysis Results</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Top Similarity Matches</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {answer.top_results.map((result, index) => (
                <Badge
                  key={result.cv_id}
                  variant="secondary"
                  className={cn(
                    "text-primary-foreground",
                    index === 0 ? "bg-primary text-white" : ""
                  )}
                >
                  {index + 1}. {result.cv_id.substring(0, 8)}... (Score:{" "}
                  {result.similarity.toFixed(3)})
                </Badge>
              ))}
            </CardContent>
          </Card>
          <ChatResponseDisplay answer={answer.answer} />
        </div>
      )}
    </PageCreate>
  );
}
