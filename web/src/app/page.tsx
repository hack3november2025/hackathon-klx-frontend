import Link from "next/link";
import {
  LayoutDashboard,
  Send,
  MessageSquare,
  Briefcase,
  PlusCircle,
  Users,
  Clock,
  Zap,
} from "lucide-react";

import { Button } from "../components/ui";
import { mockPartialDashboardData } from "../mocks";
import { MetricCard, NavigationCard } from "../components";

export default function HomePage() {
  const data = mockPartialDashboardData.metrics;

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 dark:bg-zinc-900">
      <main className="w-full max-w-7xl flex flex-col items-center py-12 px-6 lg:py-20 lg:px-8 space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            AI-Powered Talent Matching
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Simplifique o Recrutamento com Geração de Vagas via IA e Avaliação
            de Candidatos em tempo real.
          </p>
          <Link href="/dashboard">
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8 rounded-lg shadow-lg">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </header>

        <section className="w-full pt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
            Key Performance Indicators (KPIs)
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <MetricCard
              title="Open Jobs"
              value={data.total_open_jobs.toString()}
              icon={Briefcase}
              description="Active roles currently posted"
              iconColorClass="text-blue-500"
            />
            <MetricCard
              title="Total Applications"
              value={data.total_applications.toString()}
              icon={Users}
              description="Candidates processed by AI"
              iconColorClass="text-green-500"
            />
            <MetricCard
              title="Avg. Time to Fill"
              value={`${data.avg_time_to_fill_days} days`}
              icon={Clock}
              description="From posting to hiring"
              iconColorClass="text-orange-500"
            />
            <MetricCard
              title="Top Candidate"
              value={data.top_score_candidate_name}
              icon={Zap}
              description="Highest AI Fit Score"
              iconColorClass="text-purple-500"
            />
          </div>
        </section>

        <div className="pt-10 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
            Main Modules
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <NavigationCard
              title="1. AI Job Offer Generator"
              description="Create complete, structured job offers instantly."
              icon={PlusCircle}
              href="/job-offer"
            />
            <NavigationCard
              title="2. Candidate Fit Dashboard"
              description="View metrics, scores, and manage applications."
              icon={LayoutDashboard}
              href="/dashboard"
            />
            <NavigationCard
              title="3. Natural Language Search"
              description="Chat with the CV database using simple queries."
              icon={MessageSquare}
              href="/chat"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
