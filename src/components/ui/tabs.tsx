// components/ui/tabs.tsx
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils'; // your className helper

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: any) => (
  <TabsPrimitive.List
    className={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted', className)}
    {...props}
  />
);
export const TabsTrigger = ({ className, ...props }: any) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
      className
    )}
    {...props}
  />
);
export const TabsContent = ({ className, ...props }: any) => (
  <TabsPrimitive.Content className={cn('mt-2', className)} {...props} />
);
