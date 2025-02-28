import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeaturedJobs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Jobs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example job cards */}
          {[1, 2, 3].map((job) => (
            <Card key={job}>
              <CardHeader>
                <CardTitle>Senior Software Engineer</CardTitle>
                <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">300,000MMK - 500,000MMK • Remote</p>
                  <p className="text-sm text-muted-foreground">
                    Full-time • 5+ years experience
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>TypeScript</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
