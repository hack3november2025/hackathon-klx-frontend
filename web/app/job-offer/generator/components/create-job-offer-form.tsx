"use client";

import { SubmitHandler, UseFormReturn, FormProvider } from "react-hook-form";
import { RefreshCw, Send } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { JobOfferRequest } from "@/types";

interface CreateJobOfferFormProps {
  form: UseFormReturn<JobOfferRequest>;
  onSubmit: SubmitHandler<JobOfferRequest>;
  isLoading?: boolean;
}

export default function CreateJobOfferForm({
  form,
  onSubmit,
  isLoading = false,
}: CreateJobOfferFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Define the Role</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="summary"
              rules={{ required: "A summary is required." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Summary (Required)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., Senior Python developer for data processing pipelines..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone Preference</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inclusive">Inclusive</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Engineering" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Lisbon or Remote" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Full-time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., 60000-80000 EUR" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Offer...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Offer Draft
                </>
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
