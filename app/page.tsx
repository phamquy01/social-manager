import { DashboardStats } from "@/components/features/dashboard/dashboard-start";
import { RecentPosts } from "@/components/features/dashboard/recent-posts";
import { UpcomingSchedule } from "@/components/features/dashboard/upcoming-schedule";

export default function Home() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPosts />
        <UpcomingSchedule />
      </div>
    </div>
  );
}
