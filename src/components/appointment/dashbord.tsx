"use client";

import React from 'react';
import { Home, Copy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentUser } from '@/components/auth/use-current-user';

// ListingCard inlined
interface ListingCardProps {
  id: string;
  title: string;
  startDate: string;
  type?: 'house' | 'listing';
  onClick?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  startDate,
  type = 'listing',
  onClick
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <Card 
      className="border hover:border-foreground/50 py-4 bg-card hover:bg-accent transition-all cursor-pointer shadow-none hover:shadow-none rounded-lg"
      onClick={handleClick}
    >
      <CardContent className="flex items-center px-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h5>
              {title}
            </h5>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// NewListingOptions inlined
interface NewListingOptionsProps {
  onCreateNew?: () => void;
  onCreateFromExisting?: () => void;
}

const NewListingOptions: React.FC<NewListingOptionsProps> = ({
  onCreateNew,
  onCreateFromExisting
}) => {
  const user = useCurrentUser();
  const registerHref = user?.id ? `/patients/${user.id}/register` : '#';
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Create a new listing */}
        <Link href={registerHref} className="w-full flex items-center justify-between h-auto py-4 border-b border-border transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left text-foreground">
              <h5>
                Create a new appointment
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-foreground group-hover:text-foreground transition-colors" />
        </Link>
        {/* Create from existing listing */}
        {/* <Link href="/host/overview" className="w-full flex items-center justify-between h-auto py-4 border-b border-border transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <h5>
                Create from an existing appointment
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-foreground group-hover:text-foreground transition-colors" />
        </Link> */}
      </div>
    </div>
  );
};

// HostDashboard
interface Listing {
  id: string;
  title: string;
  startDate: string;
  type: 'house' | 'listing';
}

interface HostDashboardProps {
  hostName?: string;
  listings?: Listing[];
  onListingClick?: (id: string) => void;
  onCreateNew?: () => void;
  onCreateFromExisting?: () => void;
}

const AppointmentDashboard: React.FC<HostDashboardProps> = ({
  hostName = "Abdout",
  listings = [
    {
      id: "1",
      title: "Your House listing started June 7, 2025",
      startDate: "June 7, 2025",
      type: "house"
    },
    {
      id: "2", 
      title: "Your listing started June 7, 2025",
      startDate: "June 7, 2025",
      type: "listing"
    }
  ],
  onListingClick,
  onCreateNew,
  onCreateFromExisting
}) => {
  return (
    <div className="max-w-[70rem] mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Welcome back, {hostName}</h3>
      </div>
      {/* Main content column */}
      <div className="flex flex-col gap-8">
        {/* Finish your listing section */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium mb-2">Finish your appointment</h4>
          <div className="space-y-3">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                startDate={listing.startDate}
                type={listing.type}
                onClick={onListingClick}
              />
            ))}
          </div>
        </div>
        {/* Start a new listing section */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium mb-2">Start a new appointment</h4>
          <NewListingOptions
            onCreateNew={onCreateNew}
            onCreateFromExisting={onCreateFromExisting}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard; 