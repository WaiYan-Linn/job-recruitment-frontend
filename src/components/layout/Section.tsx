import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your Next Career Opportunity
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Connect with top companies and discover opportunities that match
            your skills and aspirations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Input placeholder="Job title or keyword" className="flex-1" />
            <Input placeholder="Location" className="flex-1" />
            <Button size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
